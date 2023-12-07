import {
  modalInteractions,
  redirectBtns,
  createTable,
} from "../../scripts/main.js";
const tableName = document.title.slice(0, document.title.indexOf(" "));
const modal = document.getElementsByClassName("modal")[0];
fetch("http://localhost:5249/employee")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    createTable(tableName, data, modal);
  });
modalInteractions(modal);
redirectBtns();
