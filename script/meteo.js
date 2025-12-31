document.addEventListener("DOMContentLoaded", () => {
  const stationSelect = document.getElementById("station-filter");
  const yearSelect = document.getElementById("year-filter");
  const kpiTempAvg = document.getElementById("kpi-temp-avg");
  const kpiPrecipTotal = document.getElementById("kpi-precip-total");

  // Stockage des données complètes
  let climateData = {
    precipitations: {},
    temperatures: {},
    rayonnements: {}
  };

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

  // --- 2. Init Filters (Zones & Years) ---
  const initFilters = () => {
    if (!stationSelect || !yearSelect) return;

    // 2a. Zones
    const zones = new Set([
      ...Object.keys(climateData.precipitations),
      ...Object.keys(climateData.temperatures),
      ...Object.keys(climateData.rayonnements)
    ]);

    stationSelect.innerHTML = "";
    
    // Ajouter l'option "Moyenne Globale" en premier
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
    
    // Défaut sur Global
    stationSelect.value = "global";

    // 2b. Années
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
      // Pour global, on prend toutes les années dispos de toutes les zones
      const zones = Object.keys(climateData.temperatures); // On se base sur temp par ex
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
      opt.innerText = "Aucune donnée";
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

  // --- 3. Render Logic ---
  const updateDashboard = () => {
    if (!stationSelect || !yearSelect) return;
    
    const zone = stationSelect.value;
    const year = yearSelect.value;

    // Update Header
    const headerTitle = document.getElementById("header-title-station");
    if (headerTitle) headerTitle.innerText = (zone === 'global') ? 'Guadeloupe (Moyenne)' : zone;

    const tMax = [];
    const tMin = [];
    const rain = [];
    const sun = [];

    // Helper pour calculer la moyenne globale d'un mois
    const getGlobalVal = (dataType, year, month, key = null) => {
        let sum = 0;
        let count = 0;
        const zones = Object.keys(climateData[dataType]);
        
        zones.forEach(z => {
            const dataYear = climateData[dataType][z]?.[year];
            if (dataYear && dataYear[month] !== undefined) {
                let val = dataYear[month];
                // Si c'est un objet (ex: {TX: 30, TN: 20})
                if (key && typeof val === 'object' && val !== null) {
                    val = val[key];
                }
                
                if (val !== null) {
                    sum += val;
                    count++;
                }
            }
        });
        return count > 0 ? (sum / count) : null;
    };

    for (let m = 1; m <= 12; m++) {
      if (zone === 'global') {
          // Calculer les moyennes de toutes les zones
          tMax.push(getGlobalVal('temperatures', year, m, 'TX'));
          tMin.push(getGlobalVal('temperatures', year, m, 'TN'));
          rain.push(getGlobalVal('precipitations', year, m));
          sun.push(getGlobalVal('rayonnements', year, m));
      } else {
          // Zone spécifique
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
    // Moyenne des (Max + Min)/2
    let sumTemp = 0;
    let countTemp = 0;
    for(let i=0; i<12; i++) {
        if(tMax[i] !== null && tMin[i] !== null) {
            sumTemp += (tMax[i] + tMin[i]) / 2;
            countTemp++;
        }
    }
    if (kpiTempAvg) kpiTempAvg.innerText = countTemp ? (sumTemp / countTemp).toFixed(1) : "--";

    // Total Pluie
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

  // --- Charts ---

  // 1. Temperature (Ancien Style: Remplissage entre Max et Min)
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
              fill: "+1", // Remplir vers le dataset suivant (Min)
            },
            {
              label: "Min",
              data: min,
              borderColor: "#fb923c", // orange-400
              backgroundColor: "rgba(251, 146, 60, 0.05)", // Back de secours
              borderWidth: 3,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 6,
              fill: false, // Déjà rempli par Max
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
              mode: 'index',
              intersect: false
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

  // 2. Rain
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
            backgroundColor: "#3b82f6",
            borderRadius: 6,
            maxBarThickness: 60,
            hoverBackgroundColor: "#2563eb",
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, border: { display: false } },
            y: { grid: { color: "#f1f5f9", borderDash: [4, 4] }, border: { display: false } }
          }
        }
      });
    }
  };

  // 3. Sun
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
            borderColor: "#f97316",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { display: true, grid: { display: false }, ticks: { font: { size: 10 } } },
            y: { display: true, grid: { color: "#f1f5f9", borderDash: [4, 4] }, border: { display: false }, ticks: { font: { size: 10 } } }
          }
        }
      });
    }
  };

  // Init Listener for year change
  if (yearSelect) yearSelect.addEventListener("change", updateDashboard);
  
  // Refresh button
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

  // Start
  fetchData();
});