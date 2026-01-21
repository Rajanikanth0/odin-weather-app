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

function getTable() {
  const table = createElement("table");

  const caption = createElement("caption", {
    textContent: "Weather Dataset"
  });

  const thead = createElement("thead");

  const theadRows = [
    { onlyTh: true,
      scope: "colgroup",
      colspan: [0, 3, 2, 2],
      content: ["Date Time", "Temperature", "Astronomy", "Conditions"]
    },
    {
      onlyTh: true,
      scope: "col",
      content: ["Date", "Max Temp", "Min Temp", "Avg Temp", "Avg Temp", "Avg Temp", "Avg Temp", "Avg Temp"]
    }
  ];

  thead.append(...theadRows.map(getRow));
  table.append(caption, thead);

  return table;
}

function handleTable() {
  const table = getTable();

  const content = document.querySelector(".content");
  content.appendChild(table);
}

export { handleTable };