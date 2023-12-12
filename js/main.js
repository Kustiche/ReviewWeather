import { tabs } from "./tabs.js";
import { tabsButtons } from "./view.js";
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
} from "./view.js";
import { addCurrentCity } from "./storage.js";
import { deleteFavorite } from "./favorite.js";

export let cityName = "barnaul";

const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "b52ea047ab48af1ff3f83a30af2b68e0";
let url = "";
let time = "";
const Error = {
  name: "Error: ",
  message: "Server error",
};

function defaultRender() {
  url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((info) => {
      if (info.cod === 200) {
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
      } else {
        throw Error;
      }
    })
    .catch((err) => alert(`${err.name + err.message}`));
  searchInput.value = "";
}

function getCurrentCity() {
  let localName = localStorage.getItem("currentCity");
  if (localName !== null) {
    cityName = localName;
  }
}

function timeRender(timestemp) {
  let date = new Date(timestemp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  time = hours + ":" + minutes;
  return time;
}

search.addEventListener("submit", (event) => {
  event.preventDefault();

  if (searchInput.value !== "") {
    cityName = searchInput.value;
  }

  defaultRender();
});

locations.addEventListener("click", (event) => {
  const isFavoriteName = event.target.className == "favorite__name";
  const isFavoriteDelete = event.target.className == "favorite__delete btn-reset";

  if (isFavoriteName) {
    cityName = event.target.textContent;

    defaultRender();
  } else if (isFavoriteDelete) {
    deleteFavorite(event);
  }
});

tabsButtons.forEach((tabsBtn) => {
  tabsBtn.addEventListener("click", tabs);
});

getCurrentCity();

defaultRender();
