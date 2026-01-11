document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  const sidebarItems = document.querySelectorAll(".sidebar-item");

  sidebarItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSection = item.getAttribute("data-section");
      navigateToSection(targetSection);
    });
  });

  navigateToSection("evolution-temperatures");
});

function navigateToSection(sectionId) {
  const currentSection = document.querySelector(".section.active");
  const targetSection = document.getElementById(`section-${sectionId}`);
  const sidebarItems = document.querySelectorAll(".sidebar-item");

  if (!targetSection || currentSection === targetSection) {
    return;
  }

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

  if (currentSection) {
    gsap.killTweensOf(currentSection);
  }
  gsap.killTweensOf(targetSection);

  if (currentSection) {
    currentSection.style.pointerEvents = "none";
    currentSection.style.zIndex = "0";

    timeline.to(currentSection, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => {
        currentSection.classList.remove("active");
        currentSection.classList.add("hidden");
        currentSection.style.display = "";
        currentSection.style.pointerEvents = "";
      },
    });
  }

  targetSection.classList.remove("hidden");
  targetSection.style.pointerEvents = "auto";
  targetSection.style.zIndex = "10";

  timeline.set(targetSection, {
    display: "flex",
    opacity: 0,
    y: 20
  });

  timeline.to(targetSection, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power3.out",
    onStart: () => {
      targetSection.classList.add("active");
      window.dispatchEvent(new Event('resize'));
    },
    onComplete: () => {
      const event = new CustomEvent("section-activated");
      targetSection.dispatchEvent(event);
    }
  }, currentSection ? "-=0.2" : 0);
}