const tbody = document.createElement("tbody");

const createTitle = () => {
  const thead = document.createElement("thead");
  const firstRow = document.createElement("tr");
  const firstCell = document.createElement("th");
  firstCell.setAttribute("colspan", "9");
  firstCell.textContent = "Emplyee";
  firstRow.append(firstCell);
  thead.append(firstRow);
  return thead;
};
const createHeaderRow = (data) => {
  const secondRow = document.createElement("tr");
  const keys = Object.keys(data[0]);

  for (let i = 0; i < keys.length; i++) {
    const td = document.createElement("td");
    td.textContent = keys[i];
    secondRow.append(td);
  }
  tbody.append(secondRow);
  return tbody;
};

const fillTable = (data) => {
  const keys = Object.keys(data[0]);
  const trs = [];
  for (let i = 0; i < data.length; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < Object.keys(data[0]).length; j++) {
      const td = document.createElement("td");
      if (keys[j] === "dateBirth") {
        const buf = data[i][keys[j]];
        td.textContent = buf.slice(0, buf.indexOf("T"));
      } else if (keys[j] === "department") {
        td.textContent = data[i][keys[j]].name;
      } else {
        td.textContent = data[i][keys[j]];
      }
      tr.append(td);
    }
    trs.push(tr);
  }
  for (let i = 0; i < trs.length; i++) {
    tbody.append(trs[i]);
  }
  return tbody;
};
fetch("http://localhost:5249/employee")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const table = document.createElement("table");
    table.append(createTitle());
    createHeaderRow(data);
    table.append(fillTable(data));
    document.body.append(table);
  });
