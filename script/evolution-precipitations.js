document.addEventListener("DOMContentLoaded", () => {
    let rawData = null; // Structure: [Zone][Year][Month] = value
    let precipChart = null;
    let isIntroFinished = false;

    const dom = {
        zoneSelect: document.getElementById("evolution-precip-zone-filter"),
        yearSelect: document.getElementById("evolution-precip-year-select"),
        refreshBtn: document.getElementById("evolution-precip-refresh-btn"),
        canvas: document.getElementById("evolution-precip-chart"),
        chartTitle: document.getElementById("evolution-precip-chart-title"),
        avgCard: document.getElementById("evolution-precip-avg"),
        varCard: document.getElementById("evolution-precip-var"),
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
            
            const allYears = new Set();
            Object.values(rawData).forEach(zoneData => {
                Object.keys(zoneData).forEach(y => allYears.add(parseInt(y)));
            });
            const sortedYears = Array.from(allYears).sort((a, b) => b - a);
            populateSelect(dom.yearSelect, sortedYears, null, sortedYears[0]);

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
        const selectedYear = parseInt(dom.yearSelect.value);

        if (!selectedYear) return { labels: [], values: [] };

        let monthlyValues = new Array(12).fill(null);
        let counts = new Array(12).fill(0);

        if (selectedZone === 'global') {
            Object.keys(rawData).forEach(zone => {
                const zoneYearData = rawData[zone][selectedYear];
                if (zoneYearData) {
                    Object.entries(zoneYearData).forEach(([monthStr, val]) => {
                        const monthIndex = parseInt(monthStr) - 1;
                        if (val !== null) {
                            monthlyValues[monthIndex] = (monthlyValues[monthIndex] || 0) + val;
                            counts[monthIndex]++;
                        }
                    });
                }
            });
            monthlyValues = monthlyValues.map((sum, i) => counts[i] > 0 ? sum / counts[i] : null);
        } else {
            const zoneYearData = rawData[selectedZone]?.[selectedYear];
            if (zoneYearData) {
                Object.entries(zoneYearData).forEach(([monthStr, val]) => {
                    const monthIndex = parseInt(monthStr) - 1;
                    monthlyValues[monthIndex] = val;
                });
            }
        }

        if (dom.chartTitle) {
            const zoneLabel = selectedZone === 'global' ? 'Guadeloupe' : selectedZone;
            dom.chartTitle.innerText = `Précipitations mensuelles - ${zoneLabel} (${selectedYear})`;
        }

        return { labels: MONTH_NAMES, values: monthlyValues };
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
                            label: (ctx) => `${ctx.formattedValue} mm`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#f5f5f5' },
                        ticks: { 
                            font: { family: "'Cabinet Grotesk', sans-serif" },
                            callback: (v) => v + ' mm'
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

            if (dom.avgCard) dom.avgCard.innerText = `${avg.toFixed(1)} mm`;
            if (dom.varCard) dom.varCard.innerText = variance.toFixed(1);
        } else {
            if (dom.avgCard) dom.avgCard.innerText = "-- mm";
            if (dom.varCard) dom.varCard.innerText = "--";
        }
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

    init();
});