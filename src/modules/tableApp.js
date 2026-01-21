import { getWeatherData } from "./apiApp";

function createElement(element, props = {}) {
  return Object.assign(document.createElement(element), props);
}

function createTh(content, scope, colspan) {
  const th = createElement("th", { textContent: content, scope });
  if (colspan) th.setAttribute("colspan", colspan);
  return th;
}

function createTd(content) {
  return createElement("td", { textContent: content });
}

function getRow({ onlyTh, scope, colspan = [], content }) {
  const tr = createElement("tr");

  const elements = onlyTh
  ? content.map((data, index) => createTh(data, scope, colspan[index]))
  : [ createTh(content[0], scope), ...content.slice(1).map(createTd) ];

  tr.append(...elements);
  return tr;
}

async function getTable(location) {
  const table = createElement("table");

  const caption = createElement("caption", {
    textContent: "Weather Dataset"
  });

  const thead = createElement("thead");
  const tbody = createElement("tbody");

  const theadRows = [
    { onlyTh: true,
      scope: "colgroup",
      colspan: [0, 3, 2, 2],
      content: ["Date Time", "Temperature", "Astronomy", "Conditions"]
    },
    {
      onlyTh: true,
      scope: "col",
      content: ["Date", "Max Temp", "Min Temp", "Temp", "Sunrise", "Sunset", "Conditions", "Icon"]
    }
  ];

  const days = await getWeatherData(location);
  const tbodyRows = days.map(data => ({ onlyTh: false, scope: "row", content: data }));;
  
  thead.append(...theadRows.map(getRow));
  tbody.append(...tbodyRows.map(getRow));

  table.append(caption, thead, tbody);
  return table;
}

async function handleTable(location) {
  const table = await getTable(location);

  const content = document.querySelector(".content");
  content.textContent = "";
  content.appendChild(table);
}

export { handleTable };