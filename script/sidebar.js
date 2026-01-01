document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  const sidebarItems = document.querySelectorAll(".sidebar-item");

  sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
      const targetSection = item.getAttribute("data-section");
      navigateToSection(targetSection);
    });
  });

  // Set default section
  navigateToSection("meteo");
});

function navigateToSection(sectionId) {
  const currentSection = document.querySelector(".section.active");
  const targetSection = document.getElementById(`section-${sectionId}`);
  const sidebarItems = document.querySelectorAll(".sidebar-item");

  if (!targetSection) {
    console.warn(`Section ${sectionId} not found`);
    return;
  }

  if (currentSection === targetSection) {
    return;
  }

  // Update Sidebar State
  sidebarItems.forEach((item) => {
    const isTarget = item.getAttribute("data-section") === sectionId;
    
    if (isTarget) {
      item.classList.add("sidebar-item--active");
      item.classList.remove("text-gray-500");
      item.classList.add("text-black");
    } else {
      item.classList.remove("sidebar-item--active");
      item.classList.add("text-gray-500");
      item.classList.remove("text-black");
    }
  });

  const timeline = gsap.timeline();

  // Exit Current Section
  if (currentSection) {
    timeline.to(currentSection, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => {
        currentSection.classList.remove("active");
        currentSection.classList.add("hidden");
      },
    });
  }

  // Prepare Target Section
  timeline.set(targetSection, {
    display: "flex", // Important: flex to match CSS
    opacity: 0,
    y: 20
  });
  
  targetSection.classList.remove("hidden");

  // Enter Target Section
  timeline.to(targetSection, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power3.out",
    onStart: () => {
      targetSection.classList.add("active");
      // Trigger charts resize/update if needed
      window.dispatchEvent(new Event('resize'));
    },
    onComplete: () => {
      const event = new CustomEvent("section-activated");
      targetSection.dispatchEvent(event);
    }
  }, "-=0.2"); // Overlap slightly
}