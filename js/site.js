document.addEventListener("DOMContentLoaded", function () {
  const switchInput = document.querySelector(".bb8-toggle__checkbox");

  // Function to apply the theme
  function applyTheme(theme) {
    document.body.setAttribute("data-gh-theme", theme);
    if (switchInput) {
      switchInput.checked = theme === "dark";
    }
  }

  // Get system preference
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const savedTheme = localStorage.getItem("theme");

  // Apply saved theme, else follow system preference
  const theme = savedTheme || (prefersDarkScheme ? "dark" : "light");
  applyTheme(theme);

  // Change theme when the switch is toggled
  if (switchInput) {
    switchInput.addEventListener("change", function () {
      const newTheme = switchInput.checked ? "dark" : "light";
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  // Listen for system preference changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (e) {
      const newTheme = e.matches ? "dark" : "light";
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    });
});
