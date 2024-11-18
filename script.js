let VisualCrossingKey = "CWZHZ6SDF9GGUUVCFUZ8WDHNJ";
let unitGroupImperial = "us";
let unitGroupMetric = "metric";
let searchTerm = "paris";

const getFullWeatherData = async (searchTerm) => {
  let response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchTerm}?unitGroup=${unitGroupMetric}&key=${VisualCrossingKey}&contentType=json`
  );
  let weatherData = await response.json();
  return weatherData;
};

const displayUI = (searchTerm) => {
  let data = getFullWeatherData(searchTerm);
  let cityName = document.querySelector(".cityName");
  let weatherDescription = document.querySelector(".weatherDescription");

  data
    .then((weatherData) => {
      return {
        address: weatherData.resolvedAddress,
        weatherDescription: weatherData.description,
        icon: weatherData.currentConditions.icon,
        feelslike: weatherData.currentConditions.feelslike,
        humidity: weatherData.currentConditions.humidity,
        tempmax: weatherData.days[0].tempmax,
        tempmin: weatherData.days[0].tempmin,
      };
    })
    .then((cleanData) => {
      //use data here
    });
};

const searchButton = document.querySelector(".searchButton");
const userInput = document.querySelector(".userInput");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  displayUI(userInput.value);
});
