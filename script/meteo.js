document.addEventListener("DOMContentLoaded", () => {
  const stationSelect = document.getElementById("station-filter");
  const yearSelect = document.getElementById("year-filter");
  const kpiTempAvg = document.getElementById("kpi-temp-avg");
  const kpiPrecipTotal = document.getElementById("kpi-precip-total");

  let climateData = { precipitations: {}, temperatures: {}, rayonnements: {} };
  let tempChart, rainChart, sunChart;
  const monthLabels = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

  // --- 1. Fetch Data ---
  const fetchData = async () => {
    try {
      const [precipRes, tempRes, sunRes] = await Promise.all([
        fetch('api/precipitations-api.php'),
        fetch('api/temperatures-api.php'),
        fetch('api/rayonnements-api.php')
      ]);

      if (!precipRes.ok || !tempRes.ok || !sunRes.ok) throw new Error("Erreur API");

      climateData.precipitations = await precipRes.json();
      climateData.temperatures = await tempRes.json();
      climateData.rayonnements = await sunRes.json();

      initFilters();
      updateDashboard();

    } catch (error) {
      console.error("Erreur fetch:", error);
    }
  };

  // --- 2. Filters ---
  const initFilters = () => {
    if (!stationSelect || !yearSelect) return;

    const zones = new Set([
      ...Object.keys(climateData.precipitations),
      ...Object.keys(climateData.temperatures),
      ...Object.keys(climateData.rayonnements)
    ]);

    stationSelect.innerHTML = "";
    const globalOpt = document.createElement("option");
    globalOpt.value = "global";
    globalOpt.innerText = "Moyenne Globale";
    stationSelect.appendChild(globalOpt);

    zones.forEach(zone => {
      const opt = document.createElement("option");
      opt.value = zone;
      opt.innerText = zone;
      stationSelect.appendChild(opt);
    });
    
    stationSelect.value = "global";
    updateYearFilter();

    stationSelect.addEventListener("change", () => {
      updateYearFilter();
      updateDashboard();
    });
  };

  const updateYearFilter = () => {
    const zone = stationSelect.value;
    let allYears = new Set();

    if (zone === 'global') {
      const zones = Object.keys(climateData.temperatures);
      zones.forEach(z => {
         Object.keys(climateData.temperatures[z] || {}).forEach(y => allYears.add(y));
      });
    } else {
      const pYears = Object.keys(climateData.precipitations[zone] || {});
      const tYears = Object.keys(climateData.temperatures[zone] || {});
      const sYears = Object.keys(climateData.rayonnements[zone] || {});
      allYears = new Set([...pYears, ...tYears, ...sYears]);
    }

    const sortedYears = [...allYears].sort((a, b) => b - a);
    const currentVal = yearSelect.value;
    yearSelect.innerHTML = "";
    
    if (sortedYears.length === 0) {
        const opt = document.createElement("option");
        opt.innerText = "-";
        yearSelect.appendChild(opt);
        return;
    }

    sortedYears.forEach(y => {
      const opt = document.createElement("option");
      opt.value = y;
      opt.innerText = y;
      yearSelect.appendChild(opt);
    });

    if (sortedYears.includes(currentVal)) {
      yearSelect.value = currentVal;
    } else {
      yearSelect.value = sortedYears[0];
    }
  };

  // --- 3. Render ---
  const updateDashboard = () => {
    if (!stationSelect || !yearSelect) return;
    
    const zone = stationSelect.value;
    const year = yearSelect.value;

    const tMax = [];
    const tMin = [];
    const rain = [];
    const sun = [];

    const getGlobalVal = (dataType, year, month, key = null) => {
        let sum = 0;
        let count = 0;
        const zones = Object.keys(climateData[dataType]);
        zones.forEach(z => {
            const dataYear = climateData[dataType][z]?.[year];
            if (dataYear && dataYear[month] !== undefined) {
                let val = dataYear[month];
                if (key && typeof val === 'object' && val !== null) val = val[key];
                if (val !== null) { sum += val; count++; }
            }
        });
        return count > 0 ? (sum / count) : null;
    };

    for (let m = 1; m <= 12; m++) {
      if (zone === 'global') {
          tMax.push(getGlobalVal('temperatures', year, m, 'TX'));
          tMin.push(getGlobalVal('temperatures', year, m, 'TN'));
          rain.push(getGlobalVal('precipitations', year, m));
          sun.push(getGlobalVal('rayonnements', year, m));
      } else {
          const tVal = climateData.temperatures[zone]?.[year]?.[m];
          if (tVal) {
            tMax.push(tVal.TX !== null ? tVal.TX : null);
            tMin.push(tVal.TN !== null ? tVal.TN : null);
          } else {
            tMax.push(null);
            tMin.push(null);
          }
          const rVal = climateData.precipitations[zone]?.[year]?.[m];
          rain.push(rVal !== undefined ? rVal : null);
          const sVal = climateData.rayonnements[zone]?.[year]?.[m];
          sun.push(sVal !== undefined ? sVal : null);
      }
    }

    // KPIs
    let sumTemp = 0, countTemp = 0;
    for(let i=0; i<12; i++) {
        if(tMax[i] !== null && tMin[i] !== null) {
            sumTemp += (tMax[i] + tMin[i]) / 2;
            countTemp++;
        }
    }
    if (kpiTempAvg) kpiTempAvg.innerText = countTemp ? (sumTemp / countTemp).toFixed(1) : "--";

    let sumRain = 0;
    rain.forEach(r => { if(r !== null) sumRain += r; });
    if (kpiPrecipTotal) kpiPrecipTotal.innerText = Math.round(sumRain);

    updateCharts(monthLabels, tMax, tMin, rain, sun);
  };

  const updateCharts = (labels, tMax, tMin, rain, sun) => {
    updateTempGraph(labels, tMax, tMin);
    updateRainGraph(labels, rain);
    updateSunGraph(labels, sun);
  };

  // Config Globale ChartJS
  Chart.defaults.font.family = "'Cabinet Grotesk', sans-serif";
  Chart.defaults.color = "#a3a3a3";

  // 1. Temp Chart (Lignes fines)
  const updateTempGraph = (labels, max, min) => {
    const ctx = document.getElementById("meteoTempChart");
    if (!ctx) return;

    if (tempChart) {
      tempChart.data.datasets[0].data = max;
      tempChart.data.datasets[1].data = min;
      tempChart.update();
    } else {
      tempChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Max",
              data: max,
              borderColor: "#171717", // Neutral-900
              borderWidth: 2,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 4,
              fill: false,
            },
            {
              label: "Min",
              data: min,
              borderColor: "#a3a3a3", // Neutral-400
              borderWidth: 2,
              borderDash: [5, 5],
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
                backgroundColor: "#000",
                titleColor: "#fff",
                bodyColor: "#fff",
                displayColors: false,
                intersect: false,
                mode: 'index',
                padding: 10,
                cornerRadius: 4
            },
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10, weight: 'bold' } } },
            y: { grid: { color: "#f5f5f5" }, border: { display: false } },
          },
          interaction: { mode: "index", intersect: false },
        },
      });
    }
  };

  // 2. Rain Chart (Barres Noires)
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
          datasets: [{
            label: "Précipitations",
            data: data,
            backgroundColor: "#171717", // Noir
            borderRadius: 2,
            barPercentage: 0.6,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { backgroundColor: "#000", displayColors: false } },
          scales: {
            x: { grid: { display: false }, border: { display: false }, ticks: { font: { weight: 'bold' } } },
            y: { grid: { color: "#f5f5f5" }, border: { display: false } }
          }
        }
      });
    }
  };

  // 3. Sun Chart (Area Grise)
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
          datasets: [{
            label: "Ensoleillement",
            data: data,
            borderColor: "#d4d4d4",
            backgroundColor: "rgba(0,0,0,0.02)",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { backgroundColor: "#000", displayColors: false } },
          scales: {
            x: { display: true, grid: { display: false }, ticks: { display: false } }, // Minimal
            y: { display: false, grid: { display: false } }
          }
        }
      });
    }
  };

  if (yearSelect) yearSelect.addEventListener("change", updateDashboard);
  
  const refreshBtn = document.getElementById("refresh-btn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      const icon = refreshBtn.querySelector("i");
      if (icon) icon.classList.add("animate-spin");
      fetchData().then(() => {
        if (icon) icon.classList.remove("animate-spin");
      });
    });
  }

  fetchData();
  
  // Entrance Animation
  const section = document.getElementById("section-meteo");
  section.addEventListener("section-activated", () => {
      const tl = gsap.timeline();
      tl.from("#section-meteo h1", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, 0);
      tl.from("#section-meteo .col-span-8", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, 0.1);
      tl.from("#section-meteo .col-span-4", { x: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, 0.2);
  });
});
