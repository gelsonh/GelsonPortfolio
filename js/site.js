
// Dark Mode Functionality

document.addEventListener("DOMContentLoaded", function () {
  const switchInput = document.querySelector(".bb8-toggle__checkbox");

  // Function to apply the theme
  function applyTheme(theme) {
    document.body.setAttribute("data-gh-theme", theme);
    switchInput.checked = theme === "dark";
  }

  // Get system configuration and apply the corresponding theme
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const savedTheme =
    localStorage.getItem("theme") || (prefersDarkScheme ? "dark" : "light");
  applyTheme(savedTheme);

  // Change the theme when the switch toggles
  switchInput.addEventListener("change", function () {
    const theme = switchInput.checked ? "dark" : "light";
    applyTheme(theme);
    localStorage.setItem("theme", theme); // Save the setting to localStorage
  });

  // Listen for changes in system configuration
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (e) {
      const newTheme = e.matches ? "dark" : "light";
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme); // Save the setting to localStorage
    });
});
