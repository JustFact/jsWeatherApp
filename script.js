let VisualCrossingKey = "CWZHZ6SDF9GGUUVCFUZ8WDHNJ";
let unitGroupImperial = "us";
let unitGroupMetric = "metric";
let searchTerm = "paris";

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

const displayUI = (searchTerm) => {
  let data = getFullWeatherData(searchTerm);
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
      };
    })
    .then((cleanData) => {
      //use data here
      cityName.textContent = cleanData.address;
      weatherDescription.textContent = cleanData.weatherDescription;
      weatherIcon.textContent = cleanData.icon;
      weatherFeelsLike.textContent = `${cleanData.feelslike}\u00B0`;
      weatherTempMax.textContent = `Max: ${cleanData.tempmax}\u00B0`;
      weatherTempMin.textContent = `Min: ${cleanData.tempmin}\u00B0`;
      weatherHumidity.textContent = `Hum: ${cleanData.humidity}%`;
    })
    .catch((error) => {
      console.log(error);
    });
};

const searchButton = document.querySelector(".searchButton");
const userInput = document.querySelector(".userInput");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  displayUI(userInput.value);
});
