/**
 * Sets the website's color theme based on the user's saved
 * preference in localStorage, or falls back to the system's
 * color scheme preference if no preference is saved. If
 * detection fails, defaults to the light theme.
 *
 * @function
 * @name setThemeFromLocalStorage
 * @returns {void}
 */
(function() 
{
  try 
  {
    var theme = localStorage.getItem('theme');
    if (!theme) 
    {
      theme = window.matchMedia(
        '(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
  }
  catch(err) 
  {
    console.error('Theme detection failed:', err);
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();