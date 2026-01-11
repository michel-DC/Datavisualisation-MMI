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
        yearSelect: document.getElementById("evolution-temp-year-select"),
        refreshBtn: document.getElementById("evolution-temp-refresh-btn"),
        canvas: document.getElementById("evolution-temp-chart"),
        chartTitle: document.getElementById("evolution-temp-chart-title"),
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
            
            // Récupérer toutes les années disponibles (toutes zones confondues)
            const allYears = new Set();
            Object.values(rawData).forEach(zoneData => {
                Object.keys(zoneData).forEach(y => allYears.add(parseInt(y)));
            });
            const sortedYears = Array.from(allYears).sort((a, b) => b - a); // Décroissant
            console.log("Years found:", sortedYears.length);
            
            populateSelect(dom.yearSelect, sortedYears, null, sortedYears[0]); // Par défaut l'année la plus récente

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
        const selectedYear = parseInt(dom.yearSelect.value);

        console.log(`Processing data for Zone: ${selectedZone}, Year: ${selectedYear}`);

        if (!selectedYear) return { labels: [], values: [] };

        // Structure : labels = Mois, values = Températures
        let monthlyValues = new Array(12).fill(null);
        let counts = new Array(12).fill(0);

        if (selectedZone === 'global') {
            // Moyenne de toutes les zones pour l'année choisie
            Object.keys(rawData).forEach(zone => {
                const zoneYearData = rawData[zone][selectedYear];
                if (zoneYearData) {
                    Object.entries(zoneYearData).forEach(([monthStr, temp]) => {
                        const monthIndex = parseInt(monthStr) - 1; // 01 -> 0
                        if (temp !== null) {
                            monthlyValues[monthIndex] = (monthlyValues[monthIndex] || 0) + temp;
                            counts[monthIndex]++;
                        }
                    });
                }
            });

            // Faire la moyenne
            monthlyValues = monthlyValues.map((sum, i) => counts[i] > 0 ? sum / counts[i] : null);

        } else {
            // Une seule zone
            const zoneYearData = rawData[selectedZone]?.[selectedYear];
            if (zoneYearData) {
                Object.entries(zoneYearData).forEach(([monthStr, temp]) => {
                    const monthIndex = parseInt(monthStr) - 1;
                    monthlyValues[monthIndex] = temp;
                });
            }
        }
        
        console.log("Monthly values computed:", monthlyValues);

        // Mettre à jour le titre
        if (dom.chartTitle) {
            const zoneLabel = selectedZone === 'global' ? 'Guadeloupe' : selectedZone;
            dom.chartTitle.innerText = `Températures mensuelles - ${zoneLabel} (${selectedYear})`;
        }

        return { labels: MONTH_NAMES, values: monthlyValues };
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
                            callback: function(value) { return value + '°C'; }
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
    };

    const setupListeners = () => {
        if (dom.zoneSelect) dom.zoneSelect.addEventListener("change", updateDashboard);
        if (dom.yearSelect) dom.yearSelect.addEventListener("change", updateDashboard);

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
