/**
 * @fileoverview
 * Handles light/dark mode theme toggling using a button.
 * Applies persisted user preference or defaults to system preference.
 * Saves selected theme to localStorage and updates the UI accordingly.
 */

/**
 * Sets up a theme toggle button that switches between light and dark mode.
 * Updates the `data-theme` attribute on <html> and button text content.
 *
 * @param {string} [buttonId='theme-toggle'] - ID of the toggle button element
 * @returns {void}
 */
export function setupThemeToggle(buttonId = 'theme-toggle') {
  const themeToggle = document.getElementById(buttonId);
  if (!themeToggle) return;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

  themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });
}