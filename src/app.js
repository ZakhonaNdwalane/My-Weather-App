function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", handleSearchSubmit);
let searchInput = document.querySelector(".search-form-input");
