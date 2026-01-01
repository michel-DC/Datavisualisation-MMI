document.addEventListener("DOMContentLoaded", () => {
  const tempCtx = document.getElementById("tempProjChart");
  const precipCtx = document.getElementById("precipProjChart");

  if (!tempCtx || !precipCtx) return;

  const fontStack = "'Cabinet Grotesk', sans-serif";
  const labels = ["2031-2055", "2056-2080", "Horizon 2080"];
  
  // Données factices pour l'exemple (à remplacer par API si dispo)
  const tempDayData = [1.0, 2.0, 3.0];
  const tempNightData = [1.5, 3.0, 3.5];
  const precipData = [-10, -12.5, -15];
  const heatwaveData = [20, 50, 80];

  // 1. Radar Chart (Températures) - Style Filaire Géométrique
  const tempChartConfig = {
    type: "radar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Jour",
          data: tempDayData,
          borderColor: "#000",
          backgroundColor: "rgba(0,0,0,0)", // Transparent
          borderWidth: 2,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#000",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: "Nuit",
          data: tempNightData,
          borderColor: "#a3a3a3",
          backgroundColor: "rgba(0,0,0,0)",
          borderWidth: 2,
          borderDash: [4, 4],
          pointBackgroundColor: "#fff",
          pointBorderColor: "#a3a3a3",
          pointRadius: 4,
          pointHoverRadius: 6,
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
          titleFont: { family: fontStack },
          bodyFont: { family: fontStack },
          padding: 10,
          cornerRadius: 4,
          displayColors: false,
        },
      },
      scales: {
        r: {
          angleLines: { display: true, color: "#e5e5e5" },
          grid: { color: "#e5e5e5", circular: false }, // Pentagonal grid
          pointLabels: {
            font: { family: fontStack, size: 11, weight: "bold" },
            color: "#525252",
          },
          ticks: { display: false, stepSize: 1 },
          min: 0,
          max: 4,
        },
      },
      animation: { duration: 1500, easing: "easeOutQuart" },
    },
  };

  // 2. Bar Chart (Climat) - Style Monochrome
  const precipChartConfig = {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Pluies",
          data: precipData,
          backgroundColor: "#d4d4d4",
          borderRadius: 2,
          barPercentage: 0.6,
        },
        {
          label: "Canicules",
          data: heatwaveData,
          backgroundColor: "#171717",
          borderRadius: 2,
          barPercentage: 0.6,
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
          titleFont: { family: fontStack },
          bodyFont: { family: fontStack },
          padding: 10,
          cornerRadius: 4,
          displayColors: false,
          callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${ctx.formattedValue}%`
          }
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: fontStack, weight: "bold" }, color: "#525252" },
          border: { display: false }
        },
        y: {
          grid: { color: "#f5f5f5", borderDash: [4, 4] },
          border: { display: false },
          ticks: { font: { family: fontStack }, color: "#a3a3a3" },
        },
      },
      animation: { duration: 1500, easing: "easeOutQuart" },
    },
  };

  const tempChart = new Chart(tempCtx, tempChartConfig);
  const precipChart = new Chart(precipCtx, precipChartConfig);

  // GSAP Entrance
  const section = document.getElementById("section-projections");
  section.addEventListener("section-activated", () => {
    const tl = gsap.timeline();
    tl.from("#section-projections h1", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, 0);
    tl.from(".proj-chart-container", { 
        y: 40, 
        opacity: 0, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "power3.out" 
    }, 0.2);
  });
  
  window.addEventListener("resize", () => {
    if (tempChart) tempChart.resize();
    if (precipChart) precipChart.resize();
  });
});