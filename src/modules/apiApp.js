function getLocation() {
  let location = prompt("location?", "");
  return location?.trim();
}

function getWeatherData() {
  let location = getLocation();
  if (!location) return;

  const url = `http://localhost:5500/${location}/database.json`;
  
  getData(url).then(weatherData => {
    console.log(weatherData);
  })
  .catch(err => {
    if (err instanceof NotFoundError) {
      console.log("WeatherData not found!");
    } else {
      console.log("Network Error!");
    }
  });
}

async function getData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new NotFoundError(response);
  }

  const data = await response.json();
  return data;
}

class NotFoundError extends Error {
  constructor(response) {
    super(`${response.statusText} for the location`);
    this.name = "NotFoundError";
    this.response = response;
  }
}

export { getWeatherData };