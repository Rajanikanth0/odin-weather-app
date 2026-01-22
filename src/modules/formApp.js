import { handleTable } from "./tableApp";
import loadingGif from "../media/Loading.gif";

function getForm() {
  const form = document.createElement("form");
  form.id = "getLocationForm";

  const location = Object.assign(document.createElement("input"), {
    type: "text",
    name: "location",
    id: "location",
    placeholder: "Location...?"
  });

  const submit = Object.assign(document.createElement("button"), {
    type: "submit",
    textContent: "Submit"
  });

  const span = document.createElement("span");
  span.className = "errorField";

  form.append(location, submit, span);
  return form;
}

function handleFormData(event) {
  event.preventDefault();

  const form = event.target;

  const formData = new FormData(form);
  const locationValue = formData.get("location");
  
  const location = locationValue?.trim() || null;
  if (!location) return;
  
  // loading here
  const img = Object.assign(document.createElement("img"), {
    src: loadingGif,
    alt: "loading...",
    className: "loading"
  });

  const errorField = form.querySelector(".errorField");
  errorField.textContent = "";
  errorField.appendChild(img);
  
  handleTable(location).catch(err => {
    errorField.textContent = err.message;
  });
}

function handleForm() {
  const form = getForm();
  form.addEventListener("submit", handleFormData);

  const content = document.querySelector(".content");
  content.textContent = "";
  content.appendChild(form);
}

export { handleForm };