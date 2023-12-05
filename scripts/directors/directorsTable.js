import {
  createHeaderRow,
  createDirectorsTitle,
  fillTable,
} from "/scripts/main.js";

fetch("http://localhost:5249/directors")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const table = document.createElement("table");
    table.append(createDirectorsTitle());
    createHeaderRow(data);
    table.append(fillTable(data));
    document.body.append(table);
  });
document
  .getElementsByClassName("redirectBtn")[0]
  .addEventListener("click", () => {
    window.location.href = "#";
  });
