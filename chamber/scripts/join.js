const timestamp = document.querySelector("#timestamp");
const modalButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".close-modal");

if (timestamp) {
  timestamp.value = new Date().toISOString();
}

modalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(`#${button.dataset.modal}`);

    if (modal) {
      modal.showModal();
    }
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});
