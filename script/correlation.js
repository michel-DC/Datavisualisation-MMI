document.addEventListener("DOMContentLoaded", () => {
    let rawData = null;
    let corrChart = null;
    let isIntroFinished = false;

    const dom = {
        zoneSelect: document.getElementById("correlation-zone-filter"),
        refreshBtn: document.getElementById("correlation-refresh-btn"),
        canvas: document.getElementById("correlation-chart"),
        rValue: document.getElementById("correlation-r-value"),
        interpretation: document.getElementById("correlation-interpretation"),
        modal: document.getElementById("corr-info-modal"),
        modalContent: document.getElementById("corr-modal-content"),
        closeModalBtn: document.getElementById("close-corr-modal"),
        discoverBtn: document.getElementById("close-corr-modal-btn")
    };

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
        const section = document.getElementById("section-correlation");
        if (section && !section.classList.contains("hidden")) {
            showModal();
        }
    });

    const init = async () => {
        if (!dom.canvas) return;

        const section = document.getElementById("section-correlation");
        if (section) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (!section.classList.contains('hidden')) {
                            if (isIntroFinished) showModal();
                            setTimeout(() => {
                                if (corrChart) {
                                    corrChart.resize();
                                    corrChart.update();
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
            });
        }

        await fetchData();
        setupListeners();
    };

    const fetchData = async () => {
        try {
            const response = await fetch('api/correlation-api.php');
            if (!response.ok) throw new Error("Erreur réseau");
            const json = await response.json();
            
            if (json.error) {
                console.error("API Error:", json.error);
                return;
            }

            rawData = json.data;
            const zones = json.zones.sort();
            populateSelect(dom.zoneSelect, zones, "Guadeloupe (Global)");
            updateDashboard();

        } catch (error) {
            console.error("Erreur fetch correlation:", error);
        }
    };

    const populateSelect = (selectEl, items, defaultLabel = null) => {
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
            selectEl.appendChild(opt);
        });
    };

    const calculatePearson = (points) => {
        // points = [{x, y}, ...]
        const n = points.length;
        if (n === 0) return 0;

        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;

        for (const p of points) {
            sumX += p.x;
            sumY += p.y;
            sumXY += p.x * p.y;
            sumX2 += p.x * p.x;
            sumY2 += p.y * p.y;
        }

        const numerator = (n * sumXY) - (sumX * sumY);
        const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

        if (denominator === 0) return 0;
        return numerator / denominator;
    };

    const getInterpretation = (r) => {
        const ar = Math.abs(r);
        let strength = "";
        let direction = r > 0 ? "Positive" : "Négative";

        if (ar < 0.3) strength = "Nulle ou Faible";
        else if (ar < 0.5) strength = "Faible";
        else if (ar < 0.7) strength = "Modérée";
        else strength = "Forte";

        return `${strength} ${direction}`;
    };

    const processData = () => {
        if (!rawData) return { points: [], r: 0 };

        const selectedZone = dom.zoneSelect.value;
        let points = [];

        if (selectedZone === 'global') {
            // Flatten all zones
            Object.values(rawData).forEach(zonePoints => {
                zonePoints.forEach(p => {
                    points.push({ x: p.tm, y: p.rr, year: p.year });
                });
            });
        } else {
            if (rawData[selectedZone]) {
                points = rawData[selectedZone].map(p => ({ x: p.tm, y: p.rr, year: p.year }));
            }
        }

        const r = calculatePearson(points);
        return { points, r };
    };

    const renderChart = ({ points, r }) => {
        if (!dom.canvas) return;
        if (corrChart) {
            corrChart.destroy();
            corrChart = null;
        }

        // Limit points for performance if global
        const displayPoints = points.length > 2000 ? points.filter((_, i) => i % 2 === 0) : points;

        corrChart = new Chart(dom.canvas, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Mois (Temp vs Pluie)',
                    data: displayPoints,
                    backgroundColor: 'rgba(147, 51, 234, 0.5)', // Purple
                    borderColor: 'rgba(147, 51, 234, 0.8)',
                    borderWidth: 1,
                    pointRadius: 3,
                    pointHoverRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => `Temp: ${ctx.parsed.x}°C, Pluie: ${ctx.parsed.y}mm (${ctx.raw.year})`
                        }
                    }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Température Moyenne (°C)', font: { weight: 'bold' } },
                        grid: { color: '#f5f5f5' }
                    },
                    y: {
                        title: { display: true, text: 'Précipitations (mm)', font: { weight: 'bold' } },
                        grid: { color: '#f5f5f5' }
                    }
                }
            }
        });

        // Update Text
        if (dom.rValue) {
            dom.rValue.innerText = r.toFixed(3);
            dom.rValue.className = `text-6xl font-black tracking-tighter ${r < 0 ? 'text-orange-600' : 'text-purple-600'}`;
        }
        if (dom.interpretation) {
            dom.interpretation.innerText = getInterpretation(r);
            dom.interpretation.className = `text-sm font-medium mt-4 px-4 py-1 rounded-full ${r < 0 ? 'bg-orange-100 text-orange-800' : 'bg-purple-100 text-purple-800'}`;
        }
    };

    const updateDashboard = () => {
        const data = processData();
        renderChart(data);
    };

    const setupListeners = () => {
        if (dom.zoneSelect) dom.zoneSelect.addEventListener("change", updateDashboard);
        if (dom.refreshBtn) dom.refreshBtn.addEventListener("click", () => {
            fetchData();
        });
        if (dom.closeModalBtn) dom.closeModalBtn.addEventListener("click", hideModal);
        if (dom.discoverBtn) dom.discoverBtn.addEventListener("click", hideModal);
    };

    init();
});
