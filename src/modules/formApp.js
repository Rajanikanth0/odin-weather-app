import { handleTable } from "./tableApp";

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

  form.append(location, submit);
  return form;
}

function handleFormData(event) {
  event.preventDefault();

  const form = event.target;

  const formData = new FormData(form);
  const locationValue = formData.get("location");

  const location = locationValue?.trim() || null;
  if (!location) return;
  
  handleTable(location).catch(err => {
    let errorBox = document.querySelector("span");
    
    if (!errorBox) {
      errorBox = document.createElement("span");
      form.appendChild(errorBox);
    }

    errorBox.textContent = err.message;
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