import {
  createHeaderRow,
  createEmployeeTitle,
  fillTable,
} from "../../scripts/main.js";

fetch("http://localhost:5249/employee")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const table = document.createElement("table");
    table.append(createEmployeeTitle());
    createHeaderRow(data);
    table.append(fillTable(data));
    document.body.append(table);
  });
document
  .getElementsByClassName("redirectBtn")[0]
  .addEventListener("click", () => {
    window.location.href = "https://fumetsunokami.github.io/testReq/directors";
  });
