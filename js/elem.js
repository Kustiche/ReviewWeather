import { locations } from "./view.js";

export function createItem(cityName) {
  let locationItem = document.createElement("div");
  locationItem.className = "favorite__item";

  let locationName = document.createElement("span");
  locationName.className = "favorite__name";
  locationName.innerText = cityName;
  locationItem.append(locationName);

  let locationButton = document.createElement("button");
  locationButton.className = "favorite__delete btn-reset";
  locationItem.append(locationButton);

  locations.prepend(locationItem);
}
