window.addEventListener("DOMContentLoaded", () => {
    const logoSection = document.querySelector(".logo-section");
    if (!logoSection) return;
    logoSection.style.cursor = "pointer";
    logoSection.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
  });