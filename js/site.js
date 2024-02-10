// document.addEventListener("DOMContentLoaded", function () {
//   const switchInput = document.querySelector(".switch__input");

//   switchInput.addEventListener("change", function () {
//     if (switchInput.checked) {
//       // Cambiar a tema dark
//       document.body.setAttribute("data-gh-theme", "dark");
//     } else {
//       // Cambiar a tema light
//       document.body.setAttribute("data-gh-theme", "light");
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const switchInput = document.querySelector(".bb8-toggle__checkbox");

  switchInput.addEventListener("change", function () {
    if (switchInput.checked) {
      // Cambiar a tema dark
      document.body.setAttribute("data-gh-theme", "dark");
    } else {
      // Cambiar a tema light
      document.body.setAttribute("data-gh-theme", "light");
    }
  });
});
