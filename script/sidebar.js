document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  const sidebarItems = document.querySelectorAll(".sidebar-item");

  sidebarItems.forEach((item) => {
    // Section navigation click logic
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

  // Update sidebar items state
  // Update sidebar items state
  sidebarItems.forEach((item) => {
    const iconContainer = item.querySelector("div"); // The icon box
    // Lucide replaces <i> with <svg>, so we must target svg
    const icon = item.querySelector("svg");
    const text = item.querySelector("span");

    // Minimalist Active State Logic - Icons Only
    if (item.getAttribute("data-section") === sectionId) {
      // Active State
      // Icon: Dark (slate-800)
      if (icon) {
        icon.classList.remove("text-slate-500");
        icon.classList.add("text-slate-800", "scale-110");
      }
    } else {
      // Inactive State
      // Icon: Gray (slate-500)
      if (icon) {
        icon.classList.add("text-slate-500");
        icon.classList.remove("text-slate-800", "scale-110");
      }
    }
  });

  const timeline = gsap.timeline();

  if (currentSection) {
    timeline.to(currentSection, {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        currentSection.classList.remove("active");
        currentSection.style.display = "none";
      },
    });
  }

  // Check if the target section has a custom entrance animation
  const isCustomAnim = targetSection.dataset.customAnim === "true";

  // Prepare initial state
  const initialProps = {
    display: "block",
  };

  // If NOT custom, prepare for standard fade-in
  if (!isCustomAnim) {
    initialProps.opacity = 0;
    initialProps.scale = 0.95;
  } else {
    // If custom, ensure it's fully visible immediately
    initialProps.opacity = 1;
    initialProps.scale = 1;
  }

  timeline.set(targetSection, initialProps);

  if (isCustomAnim) {
    // For custom sections, just trigger the active state and event immediately
    timeline.add(() => {
      targetSection.classList.add("active");
      const event = new CustomEvent("section-activated");
      targetSection.dispatchEvent(event);
    });
  } else {
    // Standard Entrance Animation
    timeline.to(targetSection, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      onStart: () => {
        targetSection.classList.add("active");
      },
      onComplete: () => {
        const event = new CustomEvent("section-activated");
        targetSection.dispatchEvent(event);
      },
    });
  }
}
