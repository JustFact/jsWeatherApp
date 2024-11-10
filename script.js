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

const getCleanData = async () => {
  let data = await getFullWeatherData(searchTerm);
  console.log(data);
  return data.days;
};
getCleanData();
