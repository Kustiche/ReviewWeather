import { cities } from "./favorite.js";

export function addCurrentCity(name) {
  localStorage.setItem("currentCity", name);
}

export function addFavoriteCities() {
  localStorage.setItem("favoriteCities", cities);
}
