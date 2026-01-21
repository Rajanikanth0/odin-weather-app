function createElement(element, props = {}) {
  return Object.assign(document.createElement(element), props);
}

function getRow({onlyTh, scope, colspan = [], content}) {
  const tr = createElement("tr");
  let elements = [];

  if (onlyTh) {
    const hasColSpan = Boolean(colspan.length);

    const th = content.map((data, index) => {
      const thElem = createElement("th", {
        textContent: data,
        scope: scope
      });

      if (hasColSpan) {
        thElem.setAttribute("colspan", colspan[index]);
      }

      return thElem;
    });

    elements.push(...th);
  } else {
    const [thData, ...tdData] = content;

    const th = createElement("th", {
      textContent: thData,
      scope: scope
    });

    const td = tdData.map(data => createElement("td", {
      textContent: data
    }));

    elements.push(th, ...td);
  }

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

  const rows = theadRows.map(rowData => getRow(rowData));

  thead.append(...rows);
  table.append(caption, thead);

  return table;
}

function handleTable() {
  const table = getTable();

  const content = document.querySelector(".content");
  content.appendChild(table);
}

export { handleTable };