const APIKey = "6221f72da9985cae5a381c1c7530fc77";
const URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const iconURL = "http://openweathermap.org/img/wn/";

const elements = {
  cityName: document.querySelector('#cityName'),
  button: document.querySelector('#searchCity'),
  city: document.querySelector('#city'),
  country: document.querySelector('#country'),
  temperature: document.querySelector('#temperature'),
  description: document.querySelector('#description'),
  feelslike: document.querySelector('#feelslike'),
  humidity: document.querySelector('#humidity'),
  wind: document.querySelector('#wind'),
  pressure: document.querySelector('#pressure'),
  icon: document.querySelector('#icon'),
  error: document.querySelector('.error'),
  details: document.querySelector('.details'),
  disclaimer: document.querySelector('.disclaimer')
};

// Main function
async function findWeather() {
  const cityInput = elements.cityName.value.trim();
  if (!cityInput) {
    alert("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(`${URL}${cityInput}&units=metric&appid=${APIKey}`);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    updateUI(data);
  } catch (err) {
    showError();
  }
}

function updateUI(data) {
  const { name, sys, main, weather, wind } = data;

  elements.city.textContent = name;
  elements.country.textContent = sys.country || "";
  elements.temperature.innerHTML = `${Math.floor(main.temp)}°<sup>c</sup>`;
  elements.description.textContent = weather[0].main;
  elements.feelslike.innerHTML = `<b>${Math.round(main.feels_like)}°C</b>`;
  elements.humidity.textContent = `${main.humidity}%`;
  elements.wind.textContent = `${wind.speed} m/s`;
  elements.pressure.textContent = `${main.pressure} hPa`;
  elements.icon.src = `${iconURL}${weather[0].icon}@2x.png`;
  elements.details.style.display = "block";
  elements.error.style.display = "none";
}

function showError() {
  elements.error.style.display = "block";
  elements.details.style.display = "none";
}

// Enter key support
elements.cityName.addEventListener("keypress", function(e) {
  if (e.key === "Enter") findWeather();
});

// Search button
elements.button.addEventListener("click", findWeather);

// Dynamic footer
const date = new Date();
elements.disclaimer.textContent = `${date.getFullYear()} © Farman Ali. All rights reserved.`;
