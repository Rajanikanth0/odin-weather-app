import { getWeatherData } from "./apiApp";

function handleFormData(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const locationValue = formData.get("location");

  const location = locationValue?.trim() || null;
  if (!location) return;
  
  getWeatherData(location);
}

function handleForm() {
  const form = document.getElementById("getLocationForm")
  form.addEventListener("submit", handleFormData);
}

export { handleForm };