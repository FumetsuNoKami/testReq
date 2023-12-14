import {
  modalOpen,
  modalHide,
  redirectBtns,
  createTable,
} from "../../scripts/main.js";
const tableName = document.title.slice(0, document.title.indexOf(" "));
const modalAdd = document.getElementsByClassName("modal")[0];
const showAdd = document.getElementsByClassName("showAddModal")[0];

fetch("http://localhost:5249/employee")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    createTable(tableName, data, modalAdd);
  });
modalOpen(modalAdd, showAdd, tableName);
modalHide(modalAdd);
redirectBtns();
