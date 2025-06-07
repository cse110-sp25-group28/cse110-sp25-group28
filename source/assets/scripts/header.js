//A click event-listener for logo-section to go to main page.
window.addEventListener("DOMContentLoaded", () => {
    const logoSection = document.querySelector(".logo-section");
    if (!logoSection) return;
    logoSection.style.cursor = "pointer";
    logoSection.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
  });