class NotFoundError extends Error {
  constructor(response) {
    super(`${response.statusText} for the location`);
    this.name = "NotFoundError";
    this.response = response;
  }
}

async function getData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new NotFoundError(response);
  }

  return response.json();
}

function fahtocelsius(fah) {
  const celsius = (fah - 32) * 5 / 9;
  return celsius.toFixed(2);
}

function getRequiredData({ days }) {
  return days.map(({ datetime, temp, tempmax, tempmin, sunrise, sunset, conditions, icon }) => [
    datetime,
    fahtocelsius(tempmax),
    fahtocelsius(tempmin),
    fahtocelsius(temp),
    sunrise,
    sunset,
    conditions,
    icon
  ]);
}

async function getWeatherData(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=Z932PRYFBE5HHBNXTRXJBL7RD&contentType=json`;
  
  try {
    const weatherData = await getData(url)
    const requiredData = getRequiredData(weatherData);
    return requiredData;

  } catch(err) {
    if (err instanceof NotFoundError) {
      console.log("Weather data not found!");
    } else {
      console.log("Network Error!", err);
    }
  }
}

export { getWeatherData };