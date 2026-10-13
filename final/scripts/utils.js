export function setupMenu() {
  const button = document.querySelector("#menuButton");
  const nav = document.querySelector("#siteNav");

  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    button.classList.toggle("open", isOpen);
    button.setAttribute("aria-expanded", isOpen);
  });
}

export function setupFooter() {
  const year = document.querySelector("#year");
  const modified = document.querySelector("#lastModified");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (modified) {
    modified.textContent = `Last Modification: ${document.lastModified}`;
  }
}

export async function getBooks() {
  try {
    const response = await fetch("data/books.json");

    if (!response.ok) {
      throw new Error("Book data was not found.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
