const tableName = document.title.slice(0, document.title.indexOf(" "));
const url = `http://localhost:5249/${tableName}`;
const modal = document.getElementsByClassName("modal")[0];
const postBtn = document.getElementsByClassName("postBtn")[0];
