import { createItem } from './elem.js';
import { locations } from './view.js';
import { cityName } from './weather.js';
import { addFavoriteCities } from './storage.js';

export let cities = [];
let citiesJson;

export function addFavorite() {
	if (cities.indexOf(cityName) == -1) {
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
	citiesJson = localStorage.getItem('favoriteCities');
	if (citiesJson !== null) {
		cities = JSON.parse(citiesJson);
		drawList();
	}
}

export function drawList() {
	citiesJson = JSON.stringify(cities);
	localStorage.setItem('favoriteCities', citiesJson);
	cities = JSON.parse(citiesJson);
	
	locations.innerHTML = '';
	cities.forEach((item) => {
		createItem(item);
	});
}
