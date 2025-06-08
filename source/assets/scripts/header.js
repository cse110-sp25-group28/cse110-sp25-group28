/**
 * @fileoverview
 * Allows logo to be clicked for nav back to main page
 */

window.addEventListener('DOMContentLoaded', () => 
{
  const logoSection = document.querySelector('.logo-section');
  if (!logoSection) return;
  logoSection.style.cursor = 'pointer';

  // Determine correct index.html path once
  let indexPath = '../index.html';
  const path = window.location.pathname;
  if (path.endsWith('/index.html') || path === '/' || path.endsWith('/')) {
    indexPath = './index.html';
  }
  logoSection.addEventListener('click', () => 
  {
    window.location.href = indexPath;
  });
});