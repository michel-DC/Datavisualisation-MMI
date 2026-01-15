document.addEventListener("DOMContentLoaded", () => {
    let rawData = null; // Structure: [Zone][Year][Month] = value
    let tempChart = null;
    let isIntroFinished = false;

    window.addEventListener("intro-finished", () => {
        isIntroFinished = true;
        // Si la section est déjà active (cas du premier chargement), on affiche le modal
        const section = document.getElementById("section-evolution-temperatures");
        if (section && !section.classList.contains("hidden")) {
            showModal();
        }
    });

    const dom = {
        zoneSelect: document.getElementById("evolution-temp-zone-filter"),
        refreshBtn: document.getElementById("evolution-temp-refresh-btn"),
        canvas: document.getElementById("evolution-temp-chart"),
        chartTitle: document.getElementById("evolution-temp-chart-title"),
        avgCard: document.getElementById("evolution-temp-avg"),
        varCard: document.getElementById("evolution-temp-var"),
        stdCard: document.getElementById("evolution-temp-std"),
        rangeCard: document.getElementById("evolution-temp-range"),
        modal: document.getElementById("temp-info-modal"),
        modalContent: document.getElementById("temp-modal-content"),
        closeModalBtn: document.getElementById("close-temp-modal"),
        discoverBtn: document.getElementById("close-temp-modal-btn")
    };

    const MONTH_NAMES = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    const showModal = () => {
        if (dom.modal && dom.modalContent) {
            dom.modal.classList.remove("opacity-0", "pointer-events-none");
            dom.modalContent.classList.remove("scale-95");
        }
    };

    const hideModal = () => {
        if (dom.modal && dom.modalContent) {
            dom.modal.classList.add("opacity-0", "pointer-events-none");
            dom.modalContent.classList.add("scale-95");
        }
    };

    const init = async () => {
        if (!dom.canvas) {
            console.error("Canvas element not found!");
            return;
        }

        const section = document.getElementById("section-evolution-temperatures");
        if (section) {
            // Observer pour détecter quand la section devient visible (suppression de la classe hidden)
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (!section.classList.contains('hidden')) {
                            console.log("Section visible, updating chart...");
                            if (isIntroFinished) showModal(); // Show modal only if intro is done
                            // Petit délai pour laisser le temps au layout de se faire
                            setTimeout(() => {
                                if (tempChart) {
                                    tempChart.resize();
                                    tempChart.update();
                                } else {
                                    updateDashboard();
                                }
                            }, 50);
                        }
                    }
                });
            });
            
            observer.observe(section, { attributes: true });

            // Écouteur personnalisé existant
            section.addEventListener("section-activated", () => {
                console.log("Event section-activated received");
                if (isIntroFinished) showModal();
                setTimeout(() => {
                     if (tempChart) tempChart.update();
                     else updateDashboard();
                }, 100);
            });
        }

        await fetchData();
        setupListeners();
    };

    const fetchData = async () => {
        try {
            console.log("Fetching data from API...");
            const response = await fetch('api/evolution-temp-api.php');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const json = await response.json();
            console.log("Data received:", json);

            if (json.error) {
                console.error("API Error:", json.error);
                return;
            }

            rawData = json.data;
            
            if (!rawData || Object.keys(rawData).length === 0) {
                console.warn("No data in 'data' property");
                return;
            }
            
            // Initialiser les filtres
            const zones = Object.keys(rawData).sort();
            populateSelect(dom.zoneSelect, zones, "Guadeloupe (Global)");
            
            updateDashboard();

        } catch (error) {
            console.error("Erreur fetch:", error);
        }
    };

    const populateSelect = (selectEl, items, defaultLabel = null, defaultValue = null) => {
        if (!selectEl) return;
        selectEl.innerHTML = "";

        if (defaultLabel) {
            const opt = document.createElement("option");
            opt.value = "global";
            opt.innerText = defaultLabel;
            selectEl.appendChild(opt);
        }

        items.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item;
            opt.innerText = item;
            if (defaultValue && item == defaultValue) {
                opt.selected = true;
            }
            selectEl.appendChild(opt);
        });
    };

    const processData = () => {
        if (!rawData) return { labels: [], values: [] };

        const selectedZone = dom.zoneSelect.value;
        console.log(`Processing decadal data for Zone: ${selectedZone}`);

        const decadalData = {}; // decade -> { sum: 0, count: 0 }

        const aggregateByDecade = (zoneData) => {
            Object.entries(zoneData).forEach(([year, months]) => {
                const decade = Math.floor(parseInt(year) / 10) * 10;
                const decadeLabel = `${decade}s`;
                if (!decadalData[decadeLabel]) decadalData[decadeLabel] = { sum: 0, count: 0 };
                
                Object.values(months).forEach(temp => {
                    if (temp !== null) {
                        decadalData[decadeLabel].sum += temp;
                        decadalData[decadeLabel].count++;
                    }
                });
            });
        };

        if (selectedZone === 'global') {
            Object.values(rawData).forEach(zoneData => aggregateByDecade(zoneData));
        } else {
            const zoneData = rawData[selectedZone];
            if (zoneData) aggregateByDecade(zoneData);
        }

        const sortedDecades = Object.keys(decadalData).sort();
        const labels = sortedDecades;
        const values = sortedDecades.map(decade => 
            decadalData[decade].count > 0 ? decadalData[decade].sum / decadalData[decade].count : null
        );

        if (dom.chartTitle) {
            const zoneLabel = selectedZone === 'global' ? 'Guadeloupe' : selectedZone;
            dom.chartTitle.innerText = `Évolution par décennie des températures - ${zoneLabel}`;
        }

        return { labels, values };
    };

    const renderChart = ({ labels, values }) => {
        if (!dom.canvas) return;
        
        // Vérifier si des données existent
        const hasData = values.some(v => v !== null);
        if (!hasData) {
            console.warn("No data to display for this selection");
        }

        if (tempChart) {
            tempChart.destroy();
            tempChart = null;
        }

        console.log("Rendering chart with values:", values);

        tempChart = new Chart(dom.canvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Température Moyenne (°C)',
                    data: values,
                    borderColor: '#f97316', // Orange-500
                    backgroundColor: 'rgba(249, 115, 22, 0.1)',
                    borderWidth: 3,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#f97316',
                    pointBorderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: '#fff',
                        titleColor: '#000',
                        bodyColor: '#000',
                        borderColor: '#e5e5e5',
                        borderWidth: 1,
                        padding: 10,
                        callbacks: {
                            label: (ctx) => `${ctx.formattedValue}°C`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: { color: '#f5f5f5' },
                        ticks: { 
                            font: { family: "'Cabinet Grotesk', sans-serif" },
                            callback: function(value) { return value.toFixed(1) + '°C'; }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { font: { family: "'Cabinet Grotesk', sans-serif", weight: 'bold' } }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    };

    const updateDashboard = () => {
        const data = processData();
        renderChart(data);

        const validValues = data.values.filter(v => v !== null);
        if (validValues.length > 0) {
            const sum = validValues.reduce((a, b) => a + b, 0);
            const avg = sum / validValues.length;
            const variance = validValues.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / validValues.length;
            const stdDev = Math.sqrt(variance);
            const range = Math.max(...validValues) - Math.min(...validValues);

            if (dom.avgCard) dom.avgCard.innerText = `${avg.toFixed(1)} °C`;
            if (dom.varCard) dom.varCard.innerText = variance.toFixed(2);
            if (dom.stdCard) dom.stdCard.innerText = `${stdDev.toFixed(2)} °C`;
            if (dom.rangeCard) dom.rangeCard.innerText = `${range.toFixed(1)} °C`;
        } else {
            if (dom.avgCard) dom.avgCard.innerText = "-- °C";
            if (dom.varCard) dom.varCard.innerText = "--";
            if (dom.stdCard) dom.stdCard.innerText = "-- °C";
            if (dom.rangeCard) dom.rangeCard.innerText = "-- °C";
        }
    };

    const setupListeners = () => {
        if (dom.zoneSelect) dom.zoneSelect.addEventListener("change", updateDashboard);

        if (dom.refreshBtn) {
            dom.refreshBtn.addEventListener("click", () => {
                const icon = dom.refreshBtn.querySelector("i");
                if (icon) icon.classList.add("animate-spin");
                fetchData().then(() => {
                    if (icon) icon.classList.remove("animate-spin");
                });
            });
        }

        if (dom.closeModalBtn) dom.closeModalBtn.addEventListener("click", hideModal);
        if (dom.discoverBtn) dom.discoverBtn.addEventListener("click", hideModal);
    };

    if (typeof Chart !== 'undefined') {
        Chart.defaults.font.family = "'Cabinet Grotesk', sans-serif";
        Chart.defaults.color = "#a3a3a3";
    }

    init();
});
