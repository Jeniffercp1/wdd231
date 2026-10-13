import { setupFooter, setupMenu } from "./utils.js";

setupMenu();
setupFooter();

const dateSent = document.querySelector("#dateSent");
const genre = document.querySelector("#genre");

if (dateSent) {
  dateSent.value = new Date().toISOString();
}

if (genre) {
  genre.addEventListener("change", () => {
    localStorage.setItem("favoriteGenre", genre.value);
  });
}
