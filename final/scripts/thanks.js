import { setupFooter, setupMenu } from "./utils.js";

setupMenu();
setupFooter();

const response = document.querySelector("#response");
const params = new URLSearchParams(window.location.search);

const fields = [
  ["Name", params.get("name")],
  ["Email", params.get("email")],
  ["Favorite Genre", params.get("genre")],
  ["Favorite Book", params.get("book")],
  ["Message", params.get("message")],
  ["Date Sent", params.get("dateSent")]
];

response.innerHTML = fields
  .map(([label, value]) => `<p><strong>${label}:</strong> ${value || "Not provided"}</p>`)
  .join("");
