function displayWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#image");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windspeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  timeElement.innerHTML = formatDay(date);
  iconElement.setAttribute("src", response.data.condition.icon_url);
}

function formatDay(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apikey = "c4d9be47o0b370b37f28te5a42babf6c";
  const apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}`;
  axios.get(apiURL).then(displayWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function displayForecast(response) {
  let days = ["Tues", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-app-forecast">
          <div class="Weather-forecast-day">
            <div class="Weather-forecast-date">${day}</div>
            <div class="Weather-forecast-icon">⛅️</div>
            <div class="Weather-forecast-temperatures">
              <div class="Weather-forecast-temperature">
                <strong>17°C</strong>
              </div>
              <div class="Weather-forecast-temperature">12°C</div>
            </div>
          </div>`;
  });
  let forecast = document.querySelector(".weather-app-forecast");
  forecast.innerHTML = forecastHtml;
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", handleSearchSubmit);
let searchInput = document.querySelector(".search-form-input");

searchCity("New York");

displayForecast();
