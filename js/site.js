// Dark Mode Function

document.addEventListener("DOMContentLoaded", function () {
  const switchInput = document.querySelector(".bb8-toggle__checkbox");

  switchInput.addEventListener("change", function () {
    if (switchInput.checked) {
      // Switch to dark theme
      document.body.setAttribute("data-gh-theme", "dark");
    } else {
      // Switch to light theme
      document.body.setAttribute("data-gh-theme", "light");
    }
  });
});
