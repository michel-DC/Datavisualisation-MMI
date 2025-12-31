document.addEventListener("DOMContentLoaded", () => {
  // === Data Generation Logic (Monthly for Single Year) ===

  // Helper: Generate 12 months of data based on a Yearly Average + Seasonal Pattern + Noise
  const generateMonthlyData = (year, type, stationOffset = 0) => {
    const months = 12;
    const data = [];
    const baseYearMod = (year - 1950) * 0.03; // Long term trend factor

    for (let m = 0; m < months; m++) {
      let val = 0;
      const noise = Math.random() - 0.5;

      if (type === "tempMax") {
        // Seasonal: hotter in July-Sept (Guadeloupe: roughly consistent but hotter in wet season)
        // Guadeloupe Seasonality: Carême (Dry/Cooler: Jan-Jun), Hivernage (Wet/Hotter: Jul-Dec)
        const season = Math.sin(((m - 4) / 12) * Math.PI * 2);
        val = 29 + baseYearMod + season * 1.5 + noise + stationOffset;
      } else if (type === "tempMin") {
        const season = Math.sin(((m - 4) / 12) * Math.PI * 2);
        val = 23 + baseYearMod + season * 1.2 + noise + stationOffset;
      } else if (type === "rain") {
        // Wet season (Jul-Nov) has peaks
        // Dry season (Feb-Apr) is low
        const isWetSeason = m >= 6 && m <= 10;
        let baseRain = isWetSeason ? 200 : 80;
        // Trend: slightly drying over years
        let dryTrend = (year - 1950) * -0.5;
        val = Math.max(
          0,
          baseRain + dryTrend + noise * 50 + stationOffset * 20
        );
      } else if (type === "sun") {
        // Inverse of rain roughly
        val =
          200 -
          (data[m] && data[m].rain ? data[m].rain * 0.2 : 0) +
          noise * 10 +
          stationOffset;
        val = Math.max(100, Math.min(300, 200 + noise * 30)); // Simplified hours/radiation mod
      }

      data.push(parseFloat(val.toFixed(1)));
    }
    return data;
  };

  // Station Config
  const stationOffsets = {
    global: { temp: 0, rain: 0 },
    "basse-terre": { temp: -1.5, rain: 3 }, // Mountains: cooler, wetter
    "grande-terre": { temp: 0.5, rain: -1 }, // Flat: warmer, drier
    "marie-galante": { temp: 0.2, rain: 0 },
    "les-saintes": { temp: 0.8, rain: -2 },
    "la-desirade": { temp: 1.2, rain: -2.5 },
  };

  // Month Labels
  const monthLabels = [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Août",
    "Sep",
    "Oct",
    "Nov",
    "Déc",
  ];

  // === DOM Elements ===
  const stationSelect = document.getElementById("station-filter");
  const yearSelect = document.getElementById("year-filter");
  const kpiTempAvg = document.getElementById("kpi-temp-avg");
  const kpiPrecipTotal = document.getElementById("kpi-precip-total");

  let tempChart, rainChart, sunChart;

  // === Init Year Options ===
  const initYears = () => {
    if (!yearSelect) return;
    const currentYear = 2023;
    for (let y = currentYear; y >= 1950; y--) {
      const opt = document.createElement("option");
      opt.value = y;
      opt.innerText = y;
      yearSelect.appendChild(opt);
    }
  };
  initYears();

  // === Render Logic ===
  const updateDashboard = () => {
    if (!yearSelect || !stationSelect) return;

    const year = parseInt(yearSelect.value);
    const station = stationSelect.value;
    const offset = stationOffsets[station];

    // Update Header Title
    const headerTitle = document.getElementById("header-title-station");
    if (headerTitle) {
      // Format station name (e.g., "basse-terre" -> "Basse-Terre")
      const stationLabel =
        stationSelect.options[stationSelect.selectedIndex].text;
      headerTitle.innerText = stationLabel;
    }

    // Generate Single Year Monthly Data
    const tMax = generateMonthlyData(year, "tempMax", offset.temp);
    const tMin = generateMonthlyData(year, "tempMin", offset.temp);
    const rain = generateMonthlyData(year, "rain", offset.rain);
    const sun = generateMonthlyData(year, "sun", 0); // Sun less affected by relief in simplified model

    // Calculate KPIs
    const avgMax = tMax.reduce((a, b) => a + b, 0) / 12;
    const avgMin = tMin.reduce((a, b) => a + b, 0) / 12;
    const globalAvg = (avgMax + avgMin) / 2;
    if (kpiTempAvg) kpiTempAvg.innerText = globalAvg.toFixed(1);

    const totalRain = rain.reduce((a, b) => a + b, 0);
    if (kpiPrecipTotal) kpiPrecipTotal.innerText = Math.round(totalRain);

    // Update Charts
    updateCharts(monthLabels, tMax, tMin, rain, sun);
  };

  const updateCharts = (labels, tMax, tMin, rain, sun) => {
    updateTempGraph(labels, tMax, tMin);
    updateRainGraph(labels, rain);
    updateSunGraph(labels, sun);
  };

  // --- Chart Implementations ---

  // 1. Temperature (Line with Area)
  const updateTempGraph = (labels, max, min) => {
    const ctx = document.getElementById("meteoTempChart");
    if (!ctx) return;

    if (tempChart) {
      tempChart.data.datasets[0].data = max;
      tempChart.data.datasets[1].data = min;
      tempChart.update();
    } else {
      Chart.defaults.font.family = "Inter, system-ui, sans-serif";
      Chart.defaults.color = "#64748b";

      tempChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Max",
              data: max,
              borderColor: "#ea580c", // orange-600
              backgroundColor: "rgba(234, 88, 12, 0.1)",
              borderWidth: 3,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 6,
              fill: true,
            },
            {
              label: "Min",
              data: min,
              borderColor: "#fb923c", // orange-400
              backgroundColor: "rgba(251, 146, 60, 0.05)",
              borderWidth: 3,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 6,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              padding: 12,
              cornerRadius: 8,
              titleFont: { size: 13, weight: 600 },
              bodyFont: { size: 13 },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 11 } },
            },
            y: {
              grid: { color: "#f1f5f9", borderDash: [4, 4] },
              border: { display: false },
            },
          },
          interaction: { mode: "index", intersect: false },
        },
      });
    }
  };

  // 2. Rain (Rounded Bars)
  const updateRainGraph = (labels, data) => {
    const ctx = document.getElementById("meteoRainChart");
    if (!ctx) return;

    if (rainChart) {
      rainChart.data.datasets[0].data = data;
      rainChart.update();
    } else {
      rainChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Précipitations",
              data: data,
              backgroundColor: "#3b82f6",
              borderRadius: 6,
              maxBarThickness: 60,
              hoverBackgroundColor: "#2563eb",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { display: false },
              border: { display: false },
            },
            y: {
              grid: { color: "#f1f5f9", borderDash: [4, 4] },
              border: { display: false },
            },
          },
        },
      });
    }
  };

  // 3. Sun (Minimalist Sparkline)
  const updateSunGraph = (labels, data) => {
    const ctx = document.getElementById("meteoSunChart");
    if (!ctx) return;

    if (sunChart) {
      sunChart.data.datasets[0].data = data;
      sunChart.update();
    } else {
      sunChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Ensoleillement",
              data: data,
              borderColor: "#f97316", // Orange
              borderWidth: 2,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 4,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "rgba(15, 23, 42, 0.9)",
              padding: 12,
              cornerRadius: 8,
              titleFont: { size: 13, weight: 600 },
              bodyFont: { size: 13 },
              callbacks: {
                label: function (context) {
                  return context.parsed.y + " MJ/m²";
                },
              },
            },
          },
          scales: {
            x: {
              display: true, // Show X Axis
              grid: { display: false },
              ticks: { display: true, font: { size: 10 } },
            },
            y: {
              display: true, // Show Y Axis
              grid: { color: "#f1f5f9", borderDash: [4, 4] },
              border: { display: false },
              ticks: { font: { size: 10 } },
            },
          },
          // Remove layout padding to use full space
        },
      });
    }
  };

  // === Listeners ===
  if (stationSelect) stationSelect.addEventListener("change", updateDashboard);
  if (yearSelect) yearSelect.addEventListener("change", updateDashboard);

  const refreshBtn = document.getElementById("refresh-btn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      const icon = refreshBtn.querySelector("i");
      if (icon) icon.classList.add("animate-spin");
      setTimeout(() => {
        if (icon) icon.classList.remove("animate-spin");
      }, 600);
      updateDashboard();
    });
  }

  // Initial Load
  setTimeout(updateDashboard, 100);
});
