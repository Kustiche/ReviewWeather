import {
	title,
	search,
	searchInput,
	weatherIco,
	nowTemp,
	nowCity,
	detailsCity,
	detailsTemp,
	detailsFeels,
	detailsWeater,
	detailsSunrise,
	detailsSunset,
	locations,
} from './view.js';
import { addFavorite, renderFavorite } from './favorite.js';
import { addCurrentCity } from './storage.js';
import { cities, drawList } from './favorite.js';

export let cityName = 'barnaul';
export const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
export const apiKey = 'b52ea047ab48af1ff3f83a30af2b68e0';
export let url;

let time;

function getCurrentCity() {
	let localName = localStorage.getItem('currentCity');
	if (localName !== null) {
		cityName = localName;
	}
}

getCurrentCity();

function timeRender(timestemp) {
	let date = new Date(timestemp * 1000);
	let hours = date.getHours();
	let minutes = date.getMinutes();

	if (hours < 10) {
		hours = '0' + hours;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	time = hours + ':' + minutes;
	return time;
}

export function defaultRender() {
	url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

	fetch(url)
		.then((response) => response.json())
		.then((info) => {
			let {
				name,
				weather,
				main: { temp, feels_like: feelsLike },
				sys: { sunrise, sunset },
			} = info;

			cityName = name;
			addCurrentCity(cityName);
			nowCity.textContent = cityName;
			detailsCity.textContent = cityName;
			title.textContent = `${cityName} | Weather`;

			temp = Math.round(temp);
			nowTemp.textContent = temp;
			detailsTemp.textContent = temp;

			feelsLike = Math.round(feelsLike);
			detailsFeels.textContent = feelsLike;

			detailsWeater.textContent = weather[0].main;

			weatherIco.alt = weather[0].description;
			weatherIco.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

			detailsSunrise.textContent = timeRender(sunrise);
			detailsSunset.textContent = timeRender(sunset);
		});
	searchInput.value = '';
}

renderFavorite();
defaultRender();

search.addEventListener('submit', (event) => {
	event.preventDefault();
	if (searchInput.value !== '') {
		cityName = searchInput.value;
	}
	defaultRender();
});

locations.addEventListener('click', (event) => {
	if (event.target.className == 'favorite__name') {
		cityName = event.target.textContent;
		defaultRender();
	} else if (event.target.className == 'favorite__delete btn-reset') {
		let favoriteParent = event.target.parentElement;
		let favoriteName = favoriteParent.querySelector('.favorite__name');

		cities.forEach((item, index) => {
			if (item == favoriteName.textContent) {
				cities.splice(index, 1);
			}
		});
		drawList();
	}
});

const favoriteBtn = document.querySelector('.now__favorite');

favoriteBtn.addEventListener('click', () => {
	addFavorite();
});
