document.addEventListener("DOMContentLoaded", () => {
    let rawData = null; // Structure: [Zone][Year][Month] = value
    let precipChart = null;
    let isIntroFinished = false;

    const dom = {
        zoneSelect: document.getElementById("evolution-precip-zone-filter"),
        refreshBtn: document.getElementById("evolution-precip-refresh-btn"),
        modeSwitch: document.getElementById("precip-mode-switch"),
        vizModal: document.getElementById("precip-viz-modal"),
        vizContent: document.getElementById("precip-viz-content"),
        closeVizModalBtn: document.getElementById("close-precip-viz-modal"),
        canvas: document.getElementById("evolution-precip-chart"),
        chartTitle: document.getElementById("evolution-precip-chart-title"),
        avgCard: document.getElementById("evolution-precip-avg"),
        varCard: document.getElementById("evolution-precip-var"),
        stdCard: document.getElementById("evolution-precip-std"),
        rangeCard: document.getElementById("evolution-precip-range"),
        modal: document.getElementById("precip-info-modal"),
        modalContent: document.getElementById("precip-modal-content"),
        closeModalBtn: document.getElementById("close-precip-modal"),
        discoverBtn: document.getElementById("close-precip-modal-btn")
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

    window.addEventListener("intro-finished", () => {
        isIntroFinished = true;
        const section = document.getElementById("section-evolution-precipitations");
        if (section && !section.classList.contains("hidden")) {
            showModal();
        }
    });

    const init = async () => {
        if (!dom.canvas) return;

        const section = document.getElementById("section-evolution-precipitations");
        if (section) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (!section.classList.contains('hidden')) {
                            console.log("Section Precip visible, updating...");
                            if (isIntroFinished) showModal();
                            setTimeout(() => {
                                if (precipChart) {
                                    precipChart.resize();
                                    precipChart.update();
                                } else {
                                    updateDashboard();
                                }
                            }, 50);
                        }
                    }
                });
            });
            observer.observe(section, { attributes: true });

            section.addEventListener("section-activated", () => {
                if (isIntroFinished) showModal();
                setTimeout(() => {
                     if (precipChart) precipChart.update();
                     else updateDashboard();
                }, 100);
            });
        }

        await fetchData();
        setupListeners();
    };

    const fetchData = async () => {
        try {
            console.log("Fetching precip data...");
            const response = await fetch('api/evolution-precip-api.php');
            if (!response.ok) throw new Error("Erreur réseau");

            const json = await response.json();
            console.log("Precip data received:", json);

            if (json.error) {
                console.error("API Error:", json.error);
                return;
            }

            rawData = json.data;
            
            const zones = Object.keys(rawData).sort();
            populateSelect(dom.zoneSelect, zones, "Guadeloupe (Global)");
            
            updateDashboard();

        } catch (error) {
            console.error("Erreur fetch precip:", error);
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
            if (defaultValue && item == defaultValue) opt.selected = true;
            selectEl.appendChild(opt);
        });
    };

    const processData = () => {
        if (!rawData) return { labels: [], values: [] };

        const selectedZone = dom.zoneSelect.value;
        console.log(`Processing decadal precip data for Zone: ${selectedZone}`);

        const decadalData = {}; // decade -> { sum: 0, count: 0 }

        const aggregateByDecade = (zoneData) => {
            Object.entries(zoneData).forEach(([year, months]) => {
                const decade = Math.floor(parseInt(year) / 10) * 10;
                const decadeLabel = `${decade}s`;
                if (!decadalData[decadeLabel]) decadalData[decadeLabel] = { sum: 0, count: 0 };
                
                Object.values(months).forEach(val => {
                    if (val !== null) {
                        decadalData[decadeLabel].sum += val;
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
            dom.chartTitle.innerText = `Évolution par décennie des précipitations - ${zoneLabel}`;
        }

        return { labels, values };
    };

    const renderChart = ({ labels, values }) => {
        if (!dom.canvas) return;
        if (precipChart) {
            precipChart.destroy();
            precipChart = null;
        }

        precipChart = new Chart(dom.canvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Cumul (mm)',
                    data: values,
                    backgroundColor: 'rgba(59, 130, 246, 0.7)', // Blue-500
                    hoverBackgroundColor: 'rgba(59, 130, 246, 1)',
                    borderRadius: 4,
                    barPercentage: 0.5,
                    categoryPercentage: 0.8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#fff',
                        titleColor: '#000',
                        bodyColor: '#000',
                        borderColor: '#e5e5e5',
                        borderWidth: 1,
                        padding: 10,
                        callbacks: {
                            label: (ctx) => `${ctx.parsed.y.toFixed(1)} mm`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#f5f5f5' },
                        ticks: { 
                            font: { family: "'Cabinet Grotesk', sans-serif" },
                            callback: (v) => v.toFixed(1) + ' mm'
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { font: { family: "'Cabinet Grotesk', sans-serif", weight: 'bold' } }
                    }
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

            if (dom.avgCard) dom.avgCard.innerText = `${avg.toFixed(1)} mm`;
            if (dom.varCard) dom.varCard.innerText = variance.toFixed(1);
            if (dom.stdCard) dom.stdCard.innerText = `${stdDev.toFixed(1)} mm`;
            if (dom.rangeCard) dom.rangeCard.innerText = `${range.toFixed(1)} mm`;
        } else {
            if (dom.avgCard) dom.avgCard.innerText = "-- mm";
            if (dom.varCard) dom.varCard.innerText = "--";
            if (dom.stdCard) dom.stdCard.innerText = "-- mm";
            if (dom.rangeCard) dom.rangeCard.innerText = "-- mm";
        }
    };

    const setupListeners = () => {
        if (dom.zoneSelect) dom.zoneSelect.addEventListener("change", updateDashboard);

        // Graphic Visualization Modal Logic
        if (dom.modeSwitch && dom.vizModal) {
            // Open modal on switch toggle ON
            dom.modeSwitch.addEventListener("change", (e) => {
                if (e.target.checked) {
                    dom.vizModal.classList.remove("opacity-0", "pointer-events-none");
                    if (dom.vizContent) dom.vizContent.classList.remove("scale-95");
                } else {
                    dom.vizModal.classList.add("opacity-0", "pointer-events-none");
                    if (dom.vizContent) dom.vizContent.classList.add("scale-95");
                }
            });

            // Close modal with X button
            if (dom.closeVizModalBtn) {
                dom.closeVizModalBtn.addEventListener("click", () => {
                    dom.vizModal.classList.add("opacity-0", "pointer-events-none");
                    if (dom.vizContent) dom.vizContent.classList.add("scale-95");
                    // Uncheck the switch when closing via X button
                    dom.modeSwitch.checked = false;
                });
            }
        }

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

    init();
});