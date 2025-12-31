/**
 * Script pour la section Projections Climatiques
 * Utilise Chart.js pour visualiser les données futures
 */

document.addEventListener("DOMContentLoaded", () => {
  const tempCtx = document.getElementById("tempProjChart");
  const precipCtx = document.getElementById("precipProjChart");

  if (!tempCtx || !precipCtx) return;

  const fontStack = "'CabinetGrotesk', 'Montserrat', sans-serif";

  // Helper for gradients
  const createGradient = (ctx, colorStart, colorEnd) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    return gradient;
  };

  // Données basées sur ARPEGE-Climat C3AF / RCP 8.5s
  const labels = ["2031-2055", "2056-2080", "Horizon 2080"];
  const tempDayData = [1.0, 2.0, 3.0];
  const tempNightData = [1.5, 3.0, 3.5];
  const precipData = [-10, -12.5, -15];
  const heatwaveData = [20, 50, 80];

  // --- NOUVEAU TYPE : RADAR CHART pour les Températures ---
  const tempChartConfig = {
    type: "radar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Jour",
          data: tempDayData,
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          borderColor: "#ef4444",
          pointBackgroundColor: "#ef4444",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#ef4444",
          borderWidth: 3,
          pointRadius: 6,
          fill: true,
        },
        {
          label: "Nuit",
          data: tempNightData,
          backgroundColor: "rgba(249, 115, 22, 0.2)",
          borderColor: "#f97316",
          pointBackgroundColor: "#f97316",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#f97316",
          borderWidth: 3,
          pointRadius: 6,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        line: { tension: 0.3 }, // Courbes plus douces
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: { family: fontStack, size: 12, weight: "600" },
            color: "#64748b",
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltip: {
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          titleFont: { family: fontStack, size: 14, weight: "bold" },
          bodyFont: { family: fontStack, size: 13 },
          padding: 16,
          cornerRadius: 12,
          callbacks: {
            label: (context) =>
              ` ${context.dataset.label}: +${context.parsed.r}°C`,
          },
        },
      },
      scales: {
        r: {
          angleLines: { display: true, color: "rgba(226, 232, 240, 0.8)" },
          grid: { color: "rgba(226, 232, 240, 0.8)", circular: true },
          pointLabels: {
            font: { family: fontStack, size: 11, weight: "bold" },
            color: "#475569",
            backdropColor: "transparent",
          },
          ticks: {
            backdropColor: "transparent",
            color: "#94a3b8",
            font: { size: 10 },
            stepSize: 1,
          },
          min: 0,
          max: 4,
          beginAtZero: true,
        },
      },
      animation: { duration: 2000, easing: "easeOutQuart" },
    },
  };

  // --- NOUVEAU TYPE : VERTICAL BAR CHART pour Précipitations/Canicules ---
  const precipChartConfig = {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Précipitations",
          data: precipData,
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          borderRadius: 4,
          borderSkipped: false,
        },
        {
          label: "Intensité Canicules",
          data: heatwaveData,
          backgroundColor: "rgba(249, 115, 22, 0.8)",
          borderRadius: 4,
          borderSkipped: false,
        },
      ],
    },
    options: {
      // indexAxis: "y", // REMOVED for vertical bars
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: { family: fontStack, size: 12, weight: "600" },
            color: "#64748b",
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltip: {
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          titleFont: { family: fontStack, size: 14, weight: "bold" },
          bodyFont: { family: fontStack, size: 13 },
          padding: 16,
          cornerRadius: 12,
          callbacks: {
            label: (context) => {
              const val = context.parsed.y;
              const label = context.dataset.label;
              const suffix = val < 0 ? "% (Baisse)" : "% (Hausse Index)";
              return ` ${label}: ${val > 0 ? "+" : ""}${val}${suffix}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            font: { family: fontStack, weight: "bold" },
            color: "#475569",
          },
        },
        y: {
          type: "linear",
          position: "left",
          title: {
            display: true,
            text: "Déficit Hydrique (%)  vs  Intensité Canicules (%)",
            color: "#64748b",
            font: {
              family: fontStack,
              size: 10,
              weight: "bold",
              textTransform: "uppercase",
            },
          },
          grid: {
            color: (ctx) =>
              ctx.tick.value === 0 ? "#334155" : "rgba(241, 245, 249, 1)",
            lineWidth: (ctx) => (ctx.tick.value === 0 ? 2 : 1),
          },
          ticks: { font: { family: fontStack }, color: "#64748b" },
          min: -30,
          max: 100,
        },
      },
      animation: { duration: 2000, easing: "easeOutQuart" },
    },
  };

  const tempChart = new Chart(tempCtx, tempChartConfig);
  const precipChart = new Chart(precipCtx, precipChartConfig);

  // GSAP Animations (identiques, pour conserver la transition)
  const section = document.getElementById("section-projections");
  const titleLine = section.querySelector(".proj-title-line");
  const separator = section.querySelector(".proj-separator");
  const chartContainers = section.querySelectorAll(".proj-chart-container");
  const legend = section.querySelector(".proj-legend");

  // Modal elements
  const openModalBtn = document.getElementById("open-proj-info");
  const modal = document.getElementById("proj-info-modal");
  const closeModalBtn = document.getElementById("close-proj-modal");
  const closeModalBtn2 = document.getElementById("close-proj-modal-btn");
  const modalContent = document.getElementById("proj-modal-content");

  let hasAnimated = false;

  function animateIn() {
    if (hasAnimated) return;
    const tl = gsap.timeline();
    tl.to(titleLine, { y: 0, opacity: 1, duration: 1, ease: "power4.out" })
      .to(
        separator,
        { width: "6rem", duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .to(
        chartContainers,
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.2)",
        },
        "-=0.3"
      )
      .to(legend, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5");
    hasAnimated = true;
  }

  let hasShownModal = false;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        if (section.classList.contains("active")) {
          if (!hasAnimated) setTimeout(animateIn, 100);
          if (!hasShownModal) {
            setTimeout(() => {
              openModal();
              hasShownModal = true;
            }, 1500);
          }
        }
      }
    });
  });

  observer.observe(section, { attributes: true });

  if (
    section.classList.contains("active") ||
    getComputedStyle(section).display !== "none"
  ) {
    if (!hasAnimated) setTimeout(animateIn, 100);
    if (!hasShownModal) {
      setTimeout(() => {
        openModal();
        hasShownModal = true;
      }, 1500);
    }
  }

  section.addEventListener("section-activated", () => {
    if (!hasAnimated) setTimeout(animateIn, 100);
    if (!hasShownModal) {
      setTimeout(() => {
        openModal();
        hasShownModal = true;
      }, 1500);
    }
  });

  function openModal() {
    modal.classList.remove("opacity-0", "pointer-events-none");
    modalContent.classList.remove("scale-95");
    modalContent.classList.add("scale-100");
  }

  function closeModal() {
    modal.classList.add("opacity-0", "pointer-events-none");
    modalContent.classList.remove("scale-100");
    modalContent.classList.add("scale-95");
  }

  if (openModalBtn) openModalBtn.addEventListener("click", openModal);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (closeModalBtn2) closeModalBtn2.addEventListener("click", closeModal);
  if (modal)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

  window.addEventListener("resize", () => {
    if (tempChart) tempChart.resize();
    if (precipChart) precipChart.resize();
  });
});
