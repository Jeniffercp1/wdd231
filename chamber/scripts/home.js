const spotlightCards = document.querySelector("#spotlightCards");

function membershipName(level) {
  if (level === 3) {
    return "Gold Member";
  }

  if (level === 2) {
    return "Silver Member";
  }

  return "Member";
}

function createSpotlight(member) {
  const card = document.createElement("article");
  card.className = "spotlight-card";

  const image = document.createElement("img");
  image.src = `images/${member.image}`;
  image.alt = `${member.name} logo`;
  image.width = 220;
  image.height = 140;
  image.loading = "lazy";

  const heading = document.createElement("h3");
  heading.textContent = member.name;

  const level = document.createElement("p");
  level.className = "member-level";
  level.textContent = membershipName(member.membershipLevel);

  const phone = document.createElement("p");
  phone.textContent = member.phone;

  const website = document.createElement("a");
  website.href = member.website;
  website.target = "_blank";
  website.rel = "noopener";
  website.textContent = new URL(member.website).hostname;

  card.append(image, heading, level, phone, website);
  return card;
}

async function showSpotlights() {
  if (!spotlightCards) {
    return;
  }

  try {
    const response = await fetch("data/members.json?v=company-links");

    if (!response.ok) {
      throw new Error("Unable to load spotlight data.");
    }

    const members = await response.json();
    const spotlightMembers = members
      .filter((member) => member.membershipLevel > 1)
      .slice(0, 3);

    spotlightMembers.forEach((member) => spotlightCards.appendChild(createSpotlight(member)));
  } catch (error) {
    spotlightCards.innerHTML = `<p>${error.message}</p>`;
  }
}

showSpotlights();
