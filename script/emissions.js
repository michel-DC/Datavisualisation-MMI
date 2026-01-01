document.addEventListener("DOMContentLoaded", () => {
  const years = Array.from({ length: 2022 - 1990 + 1 }, (_, i) => 1990 + i);
  const ctx = document.getElementById("emissionsChart");
  let chartInstance = null;

  const fetchAndRenderChart = () => {
    fetch("api/emissions-api.php")
      .then((response) => response.json())
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
      // Palette Colorée & Sobre (Tailwind 500)
      // Industrie: Slate/Gray, Transports: Blue, Agri: Green, Tertiaire: Purple, Déchets: Amber
      // Ordre supposé ou par index rotatif
      const colors = ["#64748b", "#3b82f6", "#22c55e", "#a855f7", "#f59e0b"];
      const color = colors[index % colors.length];

      return {
        label: type,
        data: getYearData(type),
        backgroundColor: color,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
        borderRadius: 2, 
        stack: "Stack 0",
      };
    });

    if (ctx) {
      Chart.defaults.font.family = "'Cabinet Grotesk', sans-serif";
      
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
            legend: { display: false }, // Légende custom en HTML
            tooltip: {
              mode: "index",
              intersect: false,
              backgroundColor: "#000",
              titleColor: "#fff",
              bodyColor: "#fff",
              padding: 10,
              cornerRadius: 4,
              displayColors: false, // Pas de carrés de couleur dans le tooltip
              callbacks: {
                title: (items) => `Année ${items[0].label}`,
                label: (context) => {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += context.parsed.y + ' kt';
                    }
                    return label;
                }
              }
            },
          },
          scales: {
            x: {
              stacked: true,
              grid: { display: false },
              ticks: {
                font: { size: 10, weight: "bold" },
                color: "#a3a3a3",
                maxTicksLimit: 8,
              },
              border: { display: false },
            },
            y: {
              stacked: true,
              grid: { color: "#f5f5f5", borderDash: [2, 2] },
              border: { display: false },
              ticks: {
                font: { size: 10 },
                color: "#a3a3a3",
              },
            },
          },
          animation: {
              duration: 1000,
              easing: 'easeOutQuart'
          },
        },
      });
    }
  };

  fetchAndRenderChart();

  // Animation Entrée via Event Dispatché par Sidebar.js
  const section = document.getElementById("section-emissions");
  
  section.addEventListener("section-activated", () => {
      // Re-trigger chart animation if needed or simple elements fade-in
      // Chart.js handles its own animation on render.
      // We can animate the HTML elements here using GSAP
      
      const tl = gsap.timeline();
      // Exemple d'animation des textes
      tl.from("#section-emissions h1", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, 0);
      tl.from("#section-emissions canvas", { scale: 0.98, opacity: 0, duration: 1, ease: "power3.out" }, 0.2);
  });

});