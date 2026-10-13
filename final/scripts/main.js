import { setupFooter, setupMenu } from "./utils.js";

setupMenu();
setupFooter();

const savedGenre = localStorage.getItem("favoriteGenre");
const message = document.querySelector("#savedGenre");

if (savedGenre && message) {
  message.textContent = `Your saved favorite genre is ${savedGenre}.`;
}
