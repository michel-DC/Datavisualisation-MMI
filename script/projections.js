document.addEventListener("DOMContentLoaded", () => {
  const tempCtx = document.getElementById("tempProjChart");
  const precipCtx = document.getElementById("precipProjChart");

  if (!tempCtx || !precipCtx) return;

  const fontStack = "'Cabinet Grotesk', sans-serif";
  const labels = ["2031-2055", "2056-2080", "Horizon 2080"];
  
  // Données factices pour l'exemple
  const tempDayData = [1.0, 2.0, 3.0];
  const tempNightData = [1.5, 3.0, 3.5];
  const precipData = [-10, -12.5, -15];
  const heatwaveData = [20, 50, 80];

  // Gradients
  const createGradient = (ctx, colorStart, colorEnd) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    return gradient;
  };

  // 1. Temp Chart (Smooth Area Line)
  const tempChart = new Chart(tempCtx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Jour",
          data: tempDayData,
          borderColor: "#f97316", // Orange-500
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            return createGradient(ctx, "rgba(249, 115, 22, 0.4)", "rgba(249, 115, 22, 0.0)");
          },
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#f97316",
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBorderWidth: 2,
        },
        {
          label: "Nuit",
          data: tempNightData,
          borderColor: "#6366f1", // Indigo-500
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            return createGradient(ctx, "rgba(99, 102, 241, 0.4)", "rgba(99, 102, 241, 0.0)");
          },
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#6366f1",
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBorderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#fff",
          titleColor: "#000",
          bodyColor: "#000",
          borderColor: "#e5e5e5",
          borderWidth: 1,
          titleFont: { family: fontStack },
          bodyFont: { family: fontStack },
          padding: 12,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
              label: (ctx) => `${ctx.dataset.label}: +${ctx.formattedValue}°C`
          }
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: fontStack, weight: "bold" }, color: "#a3a3a3" },
          border: { display: false }
        },
        y: {
          grid: { color: "#f5f5f5", borderDash: [4, 4] },
          border: { display: false },
          ticks: { font: { family: fontStack }, color: "#a3a3a3" },
          suggestedMin: 0,
        },
      },
      interaction: {
        mode: 'index',
        intersect: false,
      },
    },
  });

  // 2. Climat Chart (Horizontal Butterfly Bar)
  const precipChart = new Chart(precipCtx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Pluies (%)",
          data: precipData, // Négatif (vers la gauche)
          backgroundColor: (context) => {
             const ctx = context.chart.ctx;
             // Horizontal Gradient (Right to Left for negative)
             const gradient = ctx.createLinearGradient(400, 0, 0, 0);
             gradient.addColorStop(0, "#0ea5e9"); // Sky-500 near zero
             gradient.addColorStop(1, "#0284c7"); // Sky-600 far
             return "#0ea5e9";
          },
          borderRadius: { topLeft: 4, bottomLeft: 4, topRight: 0, bottomRight: 0 },
          barPercentage: 0.6,
        },
        {
          label: "Canicules (jours)",
          data: heatwaveData, // Positif (vers la droite)
          backgroundColor: "#ef4444", // Red-500
          borderRadius: { topLeft: 0, bottomLeft: 0, topRight: 4, bottomRight: 4 },
          barPercentage: 0.6,
        },
      ],
    },
    options: {
      indexAxis: 'y', // Horizontal bars
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#fff",
          titleColor: "#000",
          bodyColor: "#000",
          borderColor: "#e5e5e5",
          borderWidth: 1,
          titleFont: { family: fontStack },
          bodyFont: { family: fontStack },
          padding: 12,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
              label: (ctx) => {
                   const val = ctx.raw;
                   const label = ctx.dataset.label.split(' ')[0];
                   const unit = label === "Pluies" ? "%" : " j";
                   // Remove minus sign for display beauty if needed, or keep it
                   return `${label}: ${val}${unit}`;
              }
          }
        },
      },
      scales: {
        x: {
          grid: { 
              color: (ctx) => ctx.tick.value === 0 ? "#a3a3a3" : "transparent", // Only zero line
              lineWidth: (ctx) => ctx.tick.value === 0 ? 2 : 0,
          },
          ticks: { 
              display: true, 
              font: { family: fontStack, size: 10 }, 
              color: "#a3a3a3",
              callback: function(val) {
                  return Math.abs(val); // Show positive numbers on both sides
              }
          },
          border: { display: false },
          suggestedMin: -20,
          suggestedMax: 80,
        },
        y: {
          grid: { display: false },
          border: { display: false },
          ticks: { font: { family: fontStack, weight: "bold", size: 12 }, color: "#1a1a1a" },
        },
      },
      animation: { duration: 1500, easing: "easeOutQuart" },
    },
  });

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