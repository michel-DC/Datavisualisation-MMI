document.addEventListener("DOMContentLoaded", () => {
    let rawData = null;
    let regressionChart = null;
    let currentRegression = null;
    let isIntroFinished = false;

    const dom = {
        zoneSelect: document.getElementById("regression-zone-filter"),
        refreshBtn: document.getElementById("regression-refresh-btn"),
        canvas: document.getElementById("regression-chart"),
        equationDisplay: document.getElementById("regression-equation"),
        predictInput: document.getElementById("predict-temp"),
        predictResult: document.getElementById("prediction-result"),
        modal: document.getElementById("reg-info-modal"),
        modalContent: document.getElementById("reg-modal-content"),
        closeModalBtn: document.getElementById("close-reg-modal"),
        discoverBtn: document.getElementById("close-reg-modal-btn")
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
        const section = document.getElementById("section-regression-lineaire");
        if (section && !section.classList.contains("hidden")) {
            showModal();
        }
    });

    const init = async () => {
        if (!dom.canvas) return;

        const section = document.getElementById("section-regression-lineaire");
        if (section) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        if (!section.classList.contains('hidden')) {
                            if (isIntroFinished) showModal();
                            setTimeout(() => {
                                if (regressionChart) {
                                    regressionChart.resize();
                                    regressionChart.update();
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
            // Reuse the same API as correlation
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
            console.error("Erreur fetch regression:", error);
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

    const calculateLinearRegression = (points) => {
        const n = points.length;
        if (n === 0) return { m: 0, b: 0, equation: "Données insuffisantes" };

        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

        for (const p of points) {
            sumX += p.x;
            sumY += p.y;
            sumXY += p.x * p.y;
            sumX2 += p.x * p.x;
        }

        const denominator = (n * sumX2) - (sumX * sumX);
        if (denominator === 0) return { m: 0, b: 0, equation: "Ligne verticale" };

        const m = ((n * sumXY) - (sumX * sumY)) / denominator;
        const b = (sumY - (m * sumX)) / n;

        const sign = b >= 0 ? "+" : "-";
        const equation = `y = ${m.toFixed(2)}x ${sign} ${Math.abs(b).toFixed(2)}`;

        return { m, b, equation };
    };

    const processData = () => {
        if (!rawData) return { points: [], regression: null };

        const selectedZone = dom.zoneSelect.value;
        let points = [];

        if (selectedZone === 'global') {
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

        const regression = calculateLinearRegression(points);
        return { points, regression };
    };

    const renderChart = ({ points, regression }) => {
        if (!dom.canvas) return;
        if (regressionChart) {
            regressionChart.destroy();
            regressionChart = null;
        }

        const displayPoints = points.length > 2000 ? points.filter((_, i) => i % 2 === 0) : points;

        let regressionDataset = [];
        if (regression && points.length > 1) {
            const xValues = points.map(p => p.x);
            const minX = Math.min(...xValues);
            const maxX = Math.max(...xValues);
            
            // Extend slightly beyond min/max for better visuals
            const padding = (maxX - minX) * 0.05;
            const startX = minX - padding;
            const endX = maxX + padding;

            regressionDataset = [
                { x: startX, y: regression.m * startX + regression.b },
                { x: endX, y: regression.m * endX + regression.b }
            ];
        }

        regressionChart = new Chart(dom.canvas, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Observations',
                        data: displayPoints,
                        backgroundColor: 'rgba(200, 200, 200, 0.5)',
                        borderColor: 'rgba(200, 200, 200, 0.8)',
                        borderWidth: 1,
                        pointRadius: 2,
                        pointHoverRadius: 4,
                        order: 2
                    },
                    {
                        type: 'line',
                        label: 'Droite de régression',
                        data: regressionDataset,
                        borderColor: 'rgba(26, 26, 26, 1)', // Black
                        borderWidth: 3,
                        pointRadius: 0,
                        fill: false,
                        tension: 0,
                        order: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => {
                                if (ctx.dataset.type === 'line') return ctx.dataset.label;
                                return `Temp: ${ctx.parsed.x}°C, Pluie: ${ctx.parsed.y}mm (${ctx.raw.year})`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Température Moyenne (°C)', font: { weight: 'bold' } },
                        grid: { color: '#f0f0f0' }
                    },
                    y: {
                        title: { display: true, text: 'Précipitations (mm)', font: { weight: 'bold' } },
                        grid: { color: '#f0f0f0' }
                    }
                }
            }
        });

        // Update Text Info
        if (dom.equationDisplay && regression) {
            dom.equationDisplay.innerText = regression.equation;
        }
    };

    const updateDashboard = () => {
        const { points, regression } = processData();
        currentRegression = regression;
        renderChart({ points, regression });
        updatePrediction(); // Clear or update prediction based on current input
    };

    const updatePrediction = () => {
        if (!dom.predictInput || !dom.predictResult) return;
        
        const tempVal = parseFloat(dom.predictInput.value);
        if (isNaN(tempVal) || !currentRegression || currentRegression.m === 0) {
            dom.predictResult.innerText = "--";
            return;
        }

        const predictedRain = (currentRegression.m * tempVal) + currentRegression.b;
        // Rain can't be negative practically, though the model might say so
        const displayRain = Math.max(0, predictedRain).toFixed(1);
        dom.predictResult.innerText = displayRain;
    };

    const setupListeners = () => {
        if (dom.zoneSelect) dom.zoneSelect.addEventListener("change", updateDashboard);
        if (dom.refreshBtn) dom.refreshBtn.addEventListener("click", () => fetchData());
        
        if (dom.predictInput) {
            dom.predictInput.addEventListener("input", updatePrediction);
        }

        if (dom.closeModalBtn) dom.closeModalBtn.addEventListener("click", hideModal);
        if (dom.discoverBtn) dom.discoverBtn.addEventListener("click", hideModal);
    };

    init();
});
