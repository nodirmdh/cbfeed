document.addEventListener("DOMContentLoaded", () => {
  const toTopButtons = document.querySelectorAll(".to-top");

  toTopButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
});
