const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");

function getMembershipLabel(level) {
  if (level === 3) {
    return "Gold Member";
  }

  if (level === 2) {
    return "Silver Member";
  }

  return "Member";
}

function buildMemberCard(member) {
  const card = document.createElement("article");
  card.className = "member-card";

  const image = document.createElement("img");
  image.src = `images/${member.image}`;
  image.alt = `${member.name} logo`;
  image.width = 220;
  image.height = 140;
  image.loading = "lazy";

  const heading = document.createElement("h3");
  heading.textContent = member.name;

  const address = document.createElement("p");
  address.textContent = member.address;

  const phone = document.createElement("p");
  phone.textContent = member.phone;

  const email = document.createElement("a");
  email.href = `mailto:${member.email}`;
  email.textContent = member.email;

  const level = document.createElement("span");
  level.className = "member-level";
  level.textContent = getMembershipLabel(member.membershipLevel);

  const description = document.createElement("p");
  description.textContent = member.description;

  card.append(image, heading, address, phone, email, level, description);
  return card;
}

async function getMembers() {
  if (!membersContainer) {
    return;
  }

  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Unable to load member data.");
    }

    const members = await response.json();
    membersContainer.innerHTML = "";
    members.forEach((member) => membersContainer.appendChild(buildMemberCard(member)));
  } catch (error) {
    membersContainer.innerHTML = `<p>${error.message}</p>`;
  }
}

function setView(view) {
  const isGrid = view === "grid";
  membersContainer.classList.toggle("grid-view", isGrid);
  membersContainer.classList.toggle("list-view", !isGrid);
  gridButton.classList.toggle("active", isGrid);
  listButton.classList.toggle("active", !isGrid);
  gridButton.setAttribute("aria-pressed", isGrid);
  listButton.setAttribute("aria-pressed", !isGrid);
}

if (gridButton && listButton && membersContainer) {
  gridButton.addEventListener("click", () => setView("grid"));
  listButton.addEventListener("click", () => setView("list"));
}

getMembers();
