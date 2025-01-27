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
  timeElement.innerHTML = formatCurrentTime(date); 
  iconElement.setAttribute("src", response.data.condition.icon_url);

  getForecast(response.data.city); 
}

function formatCurrentTime(date) {
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

function getForecast(city) {
  let apikey = "c4d9be47o0b370b37f28te5a42babf6c";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}`;
  axios.get(apiURL).then(displayForecast);
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastHtml = "";
  let currentDate = new Date().getDay(); 

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      
      let forecastDay = (currentDate + index) % 7; 
      forecastHtml += `
        <div class="Weather-forecast-day">
          <div class="Weather-forecast-date">${
            ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"][forecastDay]
          }</div>
          <img src="${day.condition.icon_url}" class="Weather-forecast-icon" />
          <div class="Weather-forecast-temperatures">
            <div class="Weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}°</strong>
            </div>
            <div class="Weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}°</div>
          </div>
        </div>`;
    }
  });

  let forecast = document.querySelector(".weather-app-forecast");
  forecast.innerHTML = forecastHtml;
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", handleSearchSubmit);
let searchInput = document.querySelector(".search-form-input");

searchCity("New York"); 