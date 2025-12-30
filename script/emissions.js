document.addEventListener("DOMContentLoaded", () => {
  const years = Array.from({ length: 2022 - 1990 + 1 }, (_, i) => 1990 + i);

  const modal = document.getElementById("emissions-info-modal");
  const modalContent = document.getElementById("emissions-modal-content");
  const openModalBtn = document.getElementById("open-emissions-info");
  const closeModalBtn = document.getElementById("close-emissions-modal");
  const closeModalBtnMain = document.getElementById(
    "close-emissions-modal-btn"
  );

  const openModal = () => {
    modal.classList.remove("pointer-events-none");
    gsap.to(modal, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.to(modalContent, {
      scale: 1,
      duration: 0.4,
      delay: 0.1,
      ease: "back.out(1.5)",
    });
    lucide.createIcons();
  };

  const closeModal = () => {
    gsap.to(modalContent, { scale: 0.95, duration: 0.2, ease: "power2.in" });
    gsap.to(modal, {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      ease: "power2.in",
      onComplete: () => modal.classList.add("pointer-events-none"),
    });
  };

  if (openModalBtn) openModalBtn.addEventListener("click", openModal);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (closeModalBtnMain)
    closeModalBtnMain.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  const ctx = document.getElementById("emissionsChart");
  let chartInstance = null;

  const fetchAndRenderChart = () => {
    fetch("api/emissions-api.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        processDataAndInitChart(data);
      })
      .catch((error) => {
        console.error("Error fetching emissions data:", error);
      });
  };

  const processDataAndInitChart = (rawData) => {
    const getYearData = (type) => {
      return years.map((year) => {
        const record = rawData.find(
          (item) => item.type_emission === type && item.annee === year
        );
        return record ? record.valeur : 0;
      });
    };

    const uniqueTypes = [...new Set(rawData.map((item) => item.type_emission))];

    const datasets = uniqueTypes.map((type, index) => {
      const colors = ["#059669", "#2563eb", "#d97706", "#a855f7", "#94a3b8"];
      const color = colors[index % colors.length];

      return {
        label: type,
        data: getYearData(type),
        backgroundColor: color,
        stack: "Stack 0",
        borderRadius:
          index === uniqueTypes.length - 1
            ? { topLeft: 4, topRight: 4, bottomLeft: 0, bottomRight: 0 }
            : 0,
      };
    });

    if (ctx) {
      chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: years,
          datasets: datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              mode: "index",
              intersect: false,
              backgroundColor: "rgba(255, 255, 255, 0.98)",
              titleColor: "#0f172a",
              bodyColor: "#64748b",
              borderColor: "#e2e8f0",
              borderWidth: 1,
              padding: 12,
              cornerRadius: 12,
              titleFont: { size: 13, weight: "700" },
              bodyFont: { size: 12, weight: "500" },
              callbacks: {
                footer: (tooltipItems) => {
                  let sum = 0;
                  tooltipItems.forEach(function (tooltipItem) {
                    sum += tooltipItem.parsed.y;
                  });
                  return "Total: " + Math.round(sum) + " kt";
                },
              },
            },
          },
          scales: {
            x: {
              stacked: true,
              grid: { display: false },
              ticks: {
                font: { size: 10, weight: "500" },
                maxTicksLimit: 12,
                color: "#94a3b8",
              },
              border: { display: false },
              title: {
                display: true,
                text: "Années",
                color: "#94a3b8",
                font: { size: 12, weight: "600" },
                padding: { top: 10 },
              },
            },
            y: {
              stacked: true,
              grid: { color: "#f1f5f9", lineWidth: 1 },
              border: { display: false },
              ticks: {
                font: { size: 10, weight: "500" },
                color: "#94a3b8",
                padding: 8,
              },
              title: {
                display: true,
                text: "Émissions (milliers de tonnes CO₂)",
                color: "#94a3b8",
                font: { size: 12, weight: "600" },
                padding: { bottom: 10 },
              },
            },
          },
          animation: false,
        },
      });
    }
  };

  fetchAndRenderChart();

  const runEntranceAnimation = () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".emissions-title-line", {
      y: "120%",
      rotate: 2,
      duration: 1.1,
      ease: "expo.out",
    });

    tl.to(
      ".emissions-separator",
      {
        width: "6rem",
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.7"
    );

    tl.to(
      ".emissions-chart-container",
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.1)",
      },
      "-=0.5"
    );

    tl.add(() => {
      if (chartInstance) {
        chartInstance.update("active");
        chartInstance.data.datasets.forEach((dataset, i) => {
          const meta = chartInstance.getDatasetMeta(i);
          meta.hidden = false;
        });
        chartInstance.options.animation = {
          duration: 1500,
          easing: "easeOutQuart",
          delay: (context) => context.dataIndex * 10,
        };
        chartInstance.update();
      }
    }, "-=0.8");

    tl.to(".emissions-legend", { opacity: 1, duration: 0.8 }, "-=0.6");
  };

  const section = document.getElementById("section-emissions");
  let hasShownModal = false;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        if (section.classList.contains("active") && !hasShownModal) {
          setTimeout(() => {
            openModal();
            hasShownModal = true;
          }, 1200);
        }
      }
    });
  });

  if (section) {
    observer.observe(section, { attributes: true });

    section.addEventListener("section-activated", () => {
      runEntranceAnimation();
      if (!hasShownModal) {
        setTimeout(() => {
          openModal();
          hasShownModal = true;
        }, 1200);
      }
    });

    if (
      getComputedStyle(section).display !== "none" &&
      !section.classList.contains("hidden")
    ) {
      runEntranceAnimation();
    }
  }

  window.animateEmissionsSection = runEntranceAnimation;
});
