const spotlightCards = document.querySelector("#spotlightCards");
const currentWeather = document.querySelector("#currentWeather");
const forecastList = document.querySelector("#forecastList");
const openWeatherApiKey = "";
const latitude = -3.2581;
const longitude = -79.9554;

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

  const address = document.createElement("p");
  address.textContent = member.address;

  const website = document.createElement("a");
  website.href = member.website;
  website.target = "_blank";
  website.rel = "noopener";
  website.textContent = new URL(member.website).hostname;

  card.append(image, heading, level, phone, address, website);
  return card;
}

function shuffleMembers(members) {
  return members
    .map((member) => ({ member, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ member }) => member);
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
    const qualifiedMembers = members.filter((member) => member.membershipLevel > 1);
    const spotlightMembers = shuffleMembers(qualifiedMembers).slice(0, 3);

    spotlightMembers.forEach((member) => spotlightCards.appendChild(createSpotlight(member)));
  } catch (error) {
    spotlightCards.innerHTML = `<p>${error.message}</p>`;
  }
}

function formatDescription(description) {
  return description
    .split(" ")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function showWeatherError(message) {
  if (currentWeather) {
    currentWeather.innerHTML = `
      <p class="weather-temp">27&deg;C</p>
      <p>Partly Cloudy</p>
      <p class="weather-status">${message}</p>
    `;
  }

  if (forecastList) {
    forecastList.innerHTML = `
      <li><span>Thu</span><span>28&deg;C</span></li>
      <li><span>Fri</span><span>29&deg;C</span></li>
      <li><span>Sat</span><span>28&deg;C</span></li>
    `;
  }
}

function displayCurrentWeather(data) {
  const weather = data.weather[0];
  currentWeather.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="${weather.description}" width="80" height="80">
    <p class="weather-temp">${Math.round(data.main.temp)}&deg;C</p>
    <p>${formatDescription(weather.description)}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind: ${Math.round(data.wind.speed * 3.6)} km/h</p>
  `;
}

function displayForecast(data) {
  const dailyForecasts = data.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 3);

  forecastList.innerHTML = dailyForecasts
    .map((item) => {
      const date = new Date(item.dt_txt);
      const day = date.toLocaleDateString("en-US", { weekday: "short" });
      return `<li><span>${day}</span><span>${Math.round(item.main.temp)}&deg;C</span></li>`;
    })
    .join("");
}

async function showWeather() {
  if (!currentWeather || !forecastList) {
    return;
  }

  if (!openWeatherApiKey) {
    showWeatherError("Machala, Ecuador");
    return;
  }

  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${openWeatherApiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${openWeatherApiKey}`;

  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("Weather data is currently unavailable.");
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    displayCurrentWeather(currentData);
    displayForecast(forecastData);
  } catch (error) {
    showWeatherError(error.message);
  }
}

showSpotlights();
showWeather();
