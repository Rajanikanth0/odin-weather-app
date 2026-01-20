class NotFoundError extends Error {
  constructor(response) {
    super(`${response.statusText} for the location`);
    this.name = "NotFoundError";
    this.response = response;
  }
}

function getLocation() {
  let location = prompt("location?", "");
  return location?.trim() || null;
}

async function getData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new NotFoundError(response);
  }

  return response.json();
}

async function getWeatherData() {
  let location = getLocation();
  if (!location) return;

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/bengaluru?unitGroup=us&key=Z932PRYFBE5HHBNXTRXJBL7RD&contentType=json`;
  
  try {
    const weatherData = await getData(url)
    console.log(weatherData);

  } catch(err) {
    if (err instanceof NotFoundError) {
      console.log("Weather data not found!");
    } else {
      console.log("Network Error!");
    }
  }
}

export { getWeatherData };