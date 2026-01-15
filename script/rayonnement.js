document.addEventListener("DOMContentLoaded", () => {
    let radiationData = null;

    const dom = {
        zones: document.querySelectorAll('.zone-path'),
        popup: document.getElementById('rayonnement-popup'),
        popupTitle: document.getElementById('popup-zone-title'),
        popupValue: document.getElementById('popup-value'),
        popupDate: document.getElementById('popup-date'),
        popupContainer: document.getElementById('popup-data-container'),
        closeBtn: document.getElementById('close-popup'),
        section: document.getElementById('section-rayonnement'),
        avgCard: document.getElementById("rayonnement-avg"),
        varCard: document.getElementById("rayonnement-var"),
        stdCard: document.getElementById("rayonnement-std")
    };

    const MONTH_NAMES = [
        "", "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    const init = async () => {
        if (!dom.section) return; 

        await fetchData();
        updateGlobalStats();
        setupListeners();
    };

    const fetchData = async () => {
        try {
            const response = await fetch('api/rayonnement-api.php');
            if (!response.ok) throw new Error('Network response was not ok');
            const json = await response.json();
            radiationData = json.data;
        } catch (error) {
            console.error("Error fetching radiation data:", error);
        }
    };

    const updateGlobalStats = () => {
        if (!radiationData) return;

        const values = Object.values(radiationData)
            .filter(d => d !== null && d.value !== null)
            .map(d => d.value);

        if (values.length > 0) {
            const sum = values.reduce((a, b) => a + b, 0);
            const avg = sum / values.length;
            const variance = values.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / values.length;
            const stdDev = Math.sqrt(variance);

            if (dom.avgCard) dom.avgCard.innerText = `${avg.toFixed(1)} J/cm²`;
            if (dom.varCard) dom.varCard.innerText = variance.toFixed(1);
            if (dom.stdCard) dom.stdCard.innerText = `${stdDev.toFixed(1)} J/cm²`;
        }
    };

    const setupListeners = () => {
        dom.zones.forEach(zone => {
            zone.addEventListener('click', (e) => {
                // Stop propagation so the section click listener doesn't immediately close it
                e.stopPropagation();
                
                const zoneName = zone.getAttribute('data-zone');
                handleZoneClick(zoneName);
                
                // Active state styling
                dom.zones.forEach(z => z.classList.remove('active'));
                zone.classList.add('active');
            });
        });

        if (dom.closeBtn) {
            dom.closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                hidePopup();
                dom.zones.forEach(z => z.classList.remove('active'));
            });
        }
        
        // Close popup when clicking anywhere in the section that isn't the popup
        if (dom.section) {
            dom.section.addEventListener('click', (e) => {
                const clickedInsidePopup = e.target.closest('#rayonnement-popup');
                if (!clickedInsidePopup) {
                    hidePopup();
                    dom.zones.forEach(z => z.classList.remove('active'));
                }
            });
        }
    };

    const handleZoneClick = (zoneName) => {
        // Reset styles first
        if (dom.popupValue) {
            dom.popupValue.parentElement.classList.remove('hidden');
            dom.popupValue.innerText = "--";
        }
        if (dom.popupDate) dom.popupDate.innerText = "";
        
        let dataKey = zoneName;
        // Simple mapping if needed, e.g. for Les Saintes if not in DB
        // Assuming API keys match data-zone attributes mostly

        let data = null;
        if (radiationData) {
            data = radiationData[dataKey];
        }

        if (dom.popupTitle) dom.popupTitle.innerText = zoneName;
        
        if (data && data.value !== null) {
            // Data Available
            if (dom.popupValue) {
                dom.popupValue.innerText = parseFloat(data.value).toFixed(1);
                // Show unit
                dom.popupValue.nextElementSibling.classList.remove('hidden');
            }
            
            if (dom.popupDate) {
                // Si 'month' est une chaine (ex: "Moyenne mensuelle"), on l'affiche directement avec l'année (ex: "1990 - 2023")
                if (isNaN(parseInt(data.month))) {
                     dom.popupDate.innerText = `${data.month} (${data.year})`;
                } else {
                    // Fallback pour l'ancien format si jamais (mois numérique)
                    const monthName = MONTH_NAMES[parseInt(data.month)] || "";
                    dom.popupDate.innerText = `${monthName} ${data.year}`;
                }
            }

            // Ensure container looks normal
            if (dom.popupContainer) {
                dom.popupContainer.classList.remove('bg-red-50', 'border-red-100');
                dom.popupContainer.classList.add('bg-[#fafafa]', 'border-gray-100');
                dom.popupContainer.querySelector('p').classList.remove('text-red-500');
                dom.popupContainer.querySelector('p').classList.add('text-gray-400');
            }

        } else {
            // Data Unavailable
            if (dom.popupValue) {
                dom.popupValue.innerText = "Données indisponibles";
                dom.popupValue.classList.remove('text-4xl');
                dom.popupValue.classList.add('text-lg');
                // Hide unit
                dom.popupValue.nextElementSibling.classList.add('hidden');
            }
            
            if (dom.popupDate) dom.popupDate.innerText = "";

            // Style for error/empty state
            if (dom.popupContainer) {
                dom.popupContainer.classList.remove('bg-[#fafafa]', 'border-gray-100');
                dom.popupContainer.classList.add('bg-red-50', 'border-red-100');
                dom.popupContainer.querySelector('p').classList.remove('text-gray-400');
                dom.popupContainer.querySelector('p').classList.add('text-red-500');
            }
        }
        
        // Reset font size if data is available (fix for toggle back)
        if (data && data.value !== null && dom.popupValue) {
             dom.popupValue.classList.add('text-4xl');
             dom.popupValue.classList.remove('text-lg');
        }

        showPopup();
    };

    const showPopup = () => {
        if (dom.popup) {
            dom.popup.classList.remove('opacity-0', 'pointer-events-none');
        }
    };

    const hidePopup = () => {
        if (dom.popup) {
            dom.popup.classList.add('opacity-0', 'pointer-events-none');
        }
    };

    init();
});