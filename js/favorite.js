import { createItem } from "./elem.js";
import { locations } from "./view.js";
import { cityName } from "./main.js";
import { addFavoriteCities } from "./storage.js";

const favoriteBtn = document.querySelector(".now__favorite");

export let cities = [];
let citiesJson;

export function addFavorite() {
  const isCity = cities.indexOf(cityName) == -1;
  if (isCity) {
    cities.push(cityName);
  } else {
    cities.forEach((item, index) => {
      if (item == cityName) {
        cities.splice(index, 1);
      }
    });
  }

  addFavoriteCities();
  drawList();
}

export function renderFavorite() {
  citiesJson = localStorage.getItem("favoriteCities");
  if (citiesJson !== null) {
    cities = JSON.parse(citiesJson);
    drawList();
  }
}

export function drawList() {
  citiesJson = JSON.stringify(cities);
  localStorage.setItem("favoriteCities", citiesJson);
  cities = JSON.parse(citiesJson);

  locations.innerHTML = "";
  cities.forEach((item) => {
    createItem(item);
  });
}

export function deleteFavorite(event) {
  let favoriteParent = event.target.parentElement;
  let favoriteName = favoriteParent.querySelector(".favorite__name");

  cities.forEach((item, index) => {
    if (item == favoriteName.textContent) {
      cities.splice(index, 1);
    }
  });

  drawList();
}

favoriteBtn.addEventListener("click", () => {
  addFavorite();
});

renderFavorite();
