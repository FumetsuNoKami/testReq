const tbody = document.createElement("tbody");

export const addBtnName = (tableName) => {
  const addBtn = document.getElementsByClassName("showAddModal")[0];
  addBtn.textContent = "Add new " + tableName;
};
export const createTitle = (tableName) => {
  const thead = document.createElement("thead");
  const firstRow = document.createElement("tr");
  const firstCell = document.createElement("th");
  firstCell.setAttribute("colspan", "9");
  firstCell.textContent = tableName;
  firstRow.append(firstCell);
  thead.append(firstRow);
  return thead;
};
export const createHeaderRow = (data) => {
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

const rowActionChoose = () => {};

export const fillTable = (data, tableName) => {
  const modal = document.getElementsByClassName("modal")[1];
  const keys = Object.keys(data[0]);
  const trs = [];

  for (let i = 0; i < data.length; i++) {
    const tr = document.createElement("tr");
    modalOpen(modal, tr, tableName);

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
  modalHide(modal);
  return tbody;
};

export const createModalInputs = (modal, data) => {
  const modalInputs = modal.getElementsByClassName("modalInputs")[0];
  const tableColNames = Object.keys(data[0]);
  for (let i = 0; i < tableColNames.length; i++) {
    if (tableColNames[i] === "department") continue;
    const label = document.createElement("label");
    const input = document.createElement("input");
    label.textContent = tableColNames[i];
    label.classList.add("inputLabel");
    label.append(input);
    modalInputs.append(label);
  }
  const postBtn = document.createElement("button");
  postBtn.classList.add("postBtn");
  postBtn.textContent = "POST";
  modal.append(postBtn);
};
export const postDataBtn = (postBtn, data, modal, tableName) => {
  postBtn.addEventListener("click", async () => {
    try {
      const inputs = document.querySelectorAll("input");
      const postData = {};
      const keys = Object.keys(data[0]);
      let j = 0;
      for (let i = 0; i < keys.length; i++) {
        console.log(inputs[j]);
        if (keys[i] === "department") {
          continue;
        }
        console.log(keys[i]);
        postData[keys[i]] = inputs[j].value;
        j++;
      }
      console.log(postData);
      const response = await fetch(`http://localhost:5249/${tableName}`, {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      console.log("Успех:", JSON.stringify(json));
    } catch (error) {
      console.error("Ошибка:", error);
    }
    modal.style.display = "none";
  });
};
export const redirectBtns = () => {
  document
    .getElementsByClassName("redirectBtn")[0]
    .addEventListener("click", () => {
      window.location.href = `https://fumetsunokami.github.io/testReq/tables/employee`;
    });
  document
    .getElementsByClassName("redirectBtn")[1]
    .addEventListener("click", () => {
      window.location.href =
        "https://fumetsunokami.github.io/testReq/tables/directors";
    });
};

export const createTable = (tableName, data, modal) => {
  addBtnName(tableName);
  createModalInputs(modal, data);
  const postData = document.getElementsByClassName("postBtn")[0];
  postDataBtn(postData, data, modal, tableName);
  const table = document.createElement("table");
  table.append(createTitle(tableName));
  createHeaderRow(data);
  table.append(fillTable(data, tableName));
  document.body.append(table);
};
export const modalOpen = (modal, target, tableName) => {
  const overlay = document.getElementsByClassName("overlay")[0];
  target.addEventListener("click", (e) => {
    if (e.currentTarget.classList.length === 0) {
      const curentRow = e.currentTarget;
      const deleteBtn = document.getElementsByClassName("deleteBtn")[0];
      const updateBtn = document.getElementsByClassName("updBtn")[0];
      deleteBtn.addEventListener("click", () => {
        const targetID = curentRow.firstChild.textContent;
        fetch(`http://localhost:5249/${tableName}/${targetID}`, {
          method: "DELETE",
        })
          .then((res) => res.text()) // or res.json()
          .then((res) => console.log(res))
          .then(curentRow.remove());
      });
      updateBtn.addEventListener("click", () => console.log("ok"));
    }
    modal.style.display = "flex";
    overlay.style.display = "block";
  });
};

export const modalHide = (modal) => {
  const overlay = document.getElementsByClassName("overlay")[0];

  modal.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      modal.style.display = "none";
      overlay.style.display = "none";
    }
  });
  window.addEventListener("click", (e) => {
    const targetElem = e.target;
    if (targetElem.classList.contains("overlay")) {
      modal.style.display = "none";
      overlay.style.display = "none";
    }
  });
};
