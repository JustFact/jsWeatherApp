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

const getCleanData = async (searchTerm) => {
  let data = await getFullWeatherData(searchTerm);
  console.log(data);
  return data;
};

const displayUI = async (searchTerm) => {
  let data = await getCleanData(searchTerm);
  let cityName = document.querySelector(".cityName");
  let weatherDescription = document.querySelector(".weatherDescription");

  cityName.textContent = data.resolvedAddress;
  weatherDescription.textContent = data.description;
};

const searchButton = document.querySelector(".searchButton");
const userInput = document.querySelector(".userInput");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  //   console.log(userInput.value);
  displayUI(userInput.value);
});
