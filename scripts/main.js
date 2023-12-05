const table = document.createElement("table");
const tbody = document.createElement("tbody");
const secondRow = document.createElement("tr");

const createTitle = () => {
  const thead = document.createElement("thead");
  const firstRow = document.createElement("tr");
  const firstCell = document.createElement("th");
  firstCell.setAttribute("colspan", "9");
  firstCell.textContent = "Emplyee";
  firstRow.append(firstCell);
  thead.append(firstRow);
  table.append(thead);
};
const fillingTable = () => {};
const createHeaderRow = (data) => {
  const keys = Object.keys(data[0]);

  for (let i = 0; i < keys.length; i++) {
    const td = document.createElement("td");
    td.textContent = keys[i];
    secondRow.append(td);
  }
  tbody.append(secondRow);
};

const fillTable = (data) => {
  const keys = Object.keys(data[0]);

  const trs = [];
  for (let i = 0; i < data.length; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < Object.keys(data[0]).length; j++) {
      const td = document.createElement("td");
      if (typeof data[i][keys[j]] !== "object") {
        td.textContent = data[i][keys[j]];
      } else {
        td.textContent = data[i][keys[j]].name;
      }
      tr.append(td);
    }
    trs.push(tr);
  }
  for (let i = 0; i < trs.length; i++) {
    tbody.append(trs[i]);
  }
  table.append(tbody);
  document.body.append(table);
};
fetch("http://localhost:5249/employee")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    createTitle();
    createHeaderRow(data);
    fillTable(data);
  });
