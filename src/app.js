function displayWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;

  temperatureElement.innerHTML = Math.round(temperature);
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

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", handleSearchSubmit);
let searchInput = document.querySelector(".search-form-input");

searchCity("New York");