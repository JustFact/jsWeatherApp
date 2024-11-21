let VisualCrossingKey = "CWZHZ6SDF9GGUUVCFUZ8WDHNJ";
let unitGroupImperial = "us";
let unitGroupMetric = "metric";
let searchTerm;
let isLoading = false;
let loaderInterval;

fetch("https://api.ipregistry.co/?key=tryout")
  .then(function (response) {
    return response.json();
  })
  .then(function (payload) {
    animateLoader();
    displayUI(payload.location.city);
  });

let svgHumidity =
  '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>water</title><path d="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z" /></svg>';
let svgTempHigh =
  '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>thermometer-chevron-up</title><path d="M17.41 11.83L20.58 15L22 13.59L17.41 9L12.82 13.59L14.24 15L17.41 11.83M10 13V5C10 3.34 8.66 2 7 2S4 3.34 4 5V13C1.79 14.66 1.34 17.79 3 20S7.79 22.66 10 21 12.66 16.21 11 14C10.72 13.62 10.38 13.28 10 13M7 4C7.55 4 8 4.45 8 5V8H6V5C6 4.45 6.45 4 7 4Z" /></svg>';
let svgTempLow =
  '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>thermometer-chevron-down</title><path d="M17.41 12.17L14.24 9L12.83 10.41L17.41 15L22 10.41L20.58 9M10 13V5C10 3.34 8.66 2 7 2S4 3.34 4 5V13C1.79 14.66 1.34 17.79 3 20S7.79 22.66 10 21 12.66 16.21 11 14C10.72 13.62 10.38 13.28 10 13M7 4C7.55 4 8 4.45 8 5V8H6V5C6 4.45 6.45 4 7 4Z" /></svg>';

let svgTempFeelLike =
  '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>thermometer-check</title><path d="M10 13V5C10 3.34 8.66 2 7 2S4 3.34 4 5V13C1.79 14.66 1.34 17.79 3 20S7.79 22.66 10 21 12.66 16.21 11 14C10.72 13.62 10.38 13.28 10 13M7 4C7.55 4 8 4.45 8 5V8H6V5C6 4.45 6.45 4 7 4M16.25 15.16L13.5 12.16L14.66 11L16.25 12.59L19.84 9L21 10.41L16.25 15.16" /></svg>';

const getWeatherConditionSVG = async (string) => {
  try {
    let response = await fetch(`./SVG/${string}.svg`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

const getFullWeatherData = async (searchTerm) => {
  try {
    let response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchTerm}?unitGroup=${unitGroupMetric}&key=${VisualCrossingKey}&contentType=json`
    );
    let weatherData = await response.json();
    return weatherData;
  } catch (e) {
    console.log(e);
  }
};

const setUpcomingWeatherCards = (days) => {
  const weatherCards = document.querySelector(".section-2 .weatherCards");
  let dayCards = [];
  days.forEach((day) => {
    let dayCard = document.createElement("div");
    dayCard.classList.add("card");

    let tempHigh = document.createElement("div");
    tempHigh.classList.add("high");
    let tempLow = document.createElement("div");
    tempLow.classList.add("low");
    let tempFeelslike = document.createElement("div");
    tempFeelslike.classList.add("feelLike");
    let datetime = document.createElement("div");
    datetime.classList.add("datetime");
    let icon = document.createElement("img");
    icon.classList.add("weatherCondition");

    tempHigh.innerHTML = svgTempHigh + ` ${day.tempmax}\u00B0`;
    tempLow.innerHTML = svgTempLow + ` ${day.tempmin}\u00B0`;
    tempFeelslike.innerHTML = svgTempFeelLike + ` ${day.feelslike}\u00B0`;
    datetime.textContent = `${day.datetime}`;
    getWeatherConditionSVG(day.icon).then((res) => {
      icon.src = res.url;
    });

    dayCard.append(...[datetime, icon, tempFeelslike, tempHigh, tempLow]);
    dayCards.push(dayCard);
  });
  weatherCards.replaceChildren(...dayCards);
};

const displayUI = (searchTerm) => {
  let cityName = document.querySelector(".cityName");
  let weatherDescription = document.querySelector(".currentWeatherDescription");
  let weatherIcon = document.querySelector(
    ".currentWeather .currentWeather-main > .icon"
  );
  let weatherFeelsLike = document.querySelector(
    ".currentWeather .currentWeather-main > .feelsLike"
  );
  let weatherTempMax = document.querySelector(".currentWeather > .tempMax");
  let weatherTempMin = document.querySelector(".currentWeather > .tempMin");
  let weatherHumidity = document.querySelector(".currentWeather > .humidity");
  let data = getFullWeatherData(searchTerm);

  data
    .then((weatherData) => {
      return {
        address: weatherData.resolvedAddress
          .split(",")
          .filter((_, index) => index !== 1)
          .toString(),
        weatherDescription: weatherData.description,
        icon: weatherData.currentConditions.icon,
        feelslike: weatherData.currentConditions.feelslike,
        humidity: Math.round(weatherData.currentConditions.humidity),
        tempmax: weatherData.days[0].tempmax,
        tempmin: weatherData.days[0].tempmin,
        days: weatherData.days.map((day) => ({
          datetime: day.datetime,
          tempmax: day.tempmax,
          tempmin: day.tempmin,
          feelslike: day.feelslike,
          icon: day.icon,
        })),
      };
    })
    .then((cleanData) => {
      //use data here
      cityName.textContent = cleanData.address;
      weatherDescription.textContent = cleanData.weatherDescription;
      getWeatherConditionSVG(cleanData.icon).then((res) => {
        weatherIcon.src = res.url;
      });
      weatherFeelsLike.textContent = `${cleanData.feelslike}\u00B0`;
      weatherTempMax.innerHTML = svgTempHigh + `${cleanData.tempmax}\u00B0`;
      weatherTempMin.innerHTML = svgTempLow + `${cleanData.tempmin}\u00B0`;
      weatherHumidity.innerHTML = svgHumidity + `${cleanData.humidity}%`;
      setUpcomingWeatherCards(cleanData.days);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      clearInterval(loaderInterval);
      loader.style.visibility = "hidden";
    });
};

const searchButton = document.querySelector(".searchButton");
const userInput = document.querySelector(".userInput");
const loader = document.querySelector(".loading");

const animateLoader = () => {
  loader.style.visibility = "visible";
  loaderInterval = setInterval(() => {
    if (isLoading) {
      loader.style.outline = "1px solid red";
      isLoading = false;
    } else {
      loader.style.outline = "10px solid green";
      isLoading = true;
    }
  }, 150);
};

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  animateLoader();
  displayUI(userInput.value);
});
