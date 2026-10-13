import { getBooks, setupFooter, setupMenu } from "./utils.js";

setupMenu();
setupFooter();

const grid = document.querySelector("#bookGrid");
const genreFilter = document.querySelector("#genreFilter");
const count = document.querySelector("#bookCount");
const dialog = document.querySelector("#bookDialog");
const dialogContent = document.querySelector("#dialogContent");
const closeDialog = document.querySelector("#closeDialog");

let books = [];

function bookCard(book) {
  return `
    <article class="book-card">
      <h2>${book.title}</h2>
      <p class="book-meta">${book.author} • ${book.year}</p>
      <p><strong>Genre:</strong> ${book.genre}</p>
      <p><strong>Place:</strong> ${book.place}, ${book.city}</p>
      <button type="button" data-title="${book.title}">More</button>
    </article>
  `;
}

function showBooks() {
  const genre = genreFilter.value;
  const filteredBooks = genre === "all" ? books : books.filter((book) => book.genre === genre);

  grid.innerHTML = filteredBooks.map(bookCard).join("");
  count.textContent = `${filteredBooks.length} books shown`;
  localStorage.setItem("favoriteGenre", genre === "all" ? "All books" : genre);
}

function fillGenres() {
  const genres = [...new Set(books.map((book) => book.genre))].sort();

  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });
}

function openBook(title) {
  const book = books.find((item) => item.title === title);

  if (!book) return;

  dialogContent.innerHTML = `
    <h2>${book.title}</h2>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Genre:</strong> ${book.genre}</p>
    <p><strong>Published:</strong> ${book.year}</p>
    <p><strong>Possible place:</strong> ${book.place}, ${book.city}</p>
    <p>${book.summary}</p>
  `;
  dialog.showModal();
}

books = await getBooks();

if (books.length > 0) {
  fillGenres();
  showBooks();
}

genreFilter.addEventListener("change", showBooks);

grid.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (button) {
    openBook(button.dataset.title);
  }
});

closeDialog.addEventListener("click", () => {
  dialog.close();
});
