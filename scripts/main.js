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
    modalOpen(modal, tr, tableName, data);

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

const deleteRow = (currentRow, tableName, modal, overlay) => {
  const targetID = currentRow.firstChild.textContent;
  fetch(`http://localhost:5249/${tableName}/${targetID}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .then(currentRow.remove());
  modal.style.display = "none";
  overlay.style.display = "none";
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
  const tablePlace = document.getElementsByClassName("table")[0];
  tablePlace.append(table);
};

const updBtnEvent = (modal, currentRow, data) => {
  const modalUpdate = document.getElementsByClassName("modal")[2];
  modalUpdate.style.display = "flex";
  modal.style.display = "none";
  const inputs = modalUpdate.getElementsByClassName("modalInputs")[0];
  const len = inputs.children.length;
  if (len) modalUpdate.getElementsByClassName("updBtn")[0].remove();
  for (let i = 0; i < len; i++) {
    inputs.children[0].remove();
  }
  const labels = Object.keys(data[0]);
  for (let i = 0; i < currentRow.children.length; i++) {
    const newInput = document.createElement("input");
    const newLabel = document.createElement("label");
    newLabel.textContent = labels[i];
    newLabel.classList.add("inputLabel");
    newInput.value = currentRow.children[i].textContent;
    newLabel.append(newInput);
    inputs.append(newLabel);
  }
  const updateBtn = document.createElement("button");
  updateBtn.textContent = "Update";
  updateBtn.classList.add("updBtn");
  modalUpdate.append(updateBtn);
  modalHide(modalUpdate);
};

export const modalOpen = (modal, target, tableName, data) => {
  const overlay = document.getElementsByClassName("overlay")[0];
  target.addEventListener("click", (e) => {
    if (e.currentTarget.classList.length === 0) {
      const currentRow = e.currentTarget;
      const newDeleteBtn = document.createElement("button");
      newDeleteBtn.classList.add("deleteBtn");
      newDeleteBtn.textContent = "Delete";
      const newUpdBtn = document.createElement("button");
      newUpdBtn.classList.add("updBtn");
      newUpdBtn.textContent = "Update";
      modal.append(newUpdBtn);
      modal.append(newDeleteBtn);
      newDeleteBtn.addEventListener("click", () => {
        deleteRow(currentRow, tableName, modal, overlay);
        newDeleteBtn.remove();
        newUpdBtn.remove();
      });
      newUpdBtn.addEventListener("click", () => {
        updBtnEvent(modal, currentRow, data);
        newUpdBtn.remove();
        newDeleteBtn.remove();
      });
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

export const showTable = () => {
  const tableName = document.title.slice(0, document.title.indexOf(" "));
  const modalAdd = document.getElementsByClassName("modal")[0];
  const showAdd = document.getElementsByClassName("showAddModal")[0];

  fetch(`http://localhost:5249/${tableName}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      createTable(tableName, data, modalAdd);
    });
  modalOpen(modalAdd, showAdd, tableName);
  modalHide(modalAdd);
  redirectBtns();
};
