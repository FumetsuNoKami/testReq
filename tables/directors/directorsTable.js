import {
  modalInteractions,
  redirectBtns,
  createTable,
} from "../../scripts/main.js";
const tableName = document.title.slice(0, document.title.indexOf(" "));
const modal = document.getElementsByClassName("modal")[0];
fetch(`http://localhost:5249/${tableName}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const keys = Object.keys(data[0]);
    const testObj = {};

    testObj[keys[0]] = "1";
    testObj[keys[1]] = "1";
    testObj[keys[2]] = "1";
    testObj[keys[3]] = "1";
    createTable(tableName, data, modal);
  });
redirectBtns();
modalInteractions(modal);
