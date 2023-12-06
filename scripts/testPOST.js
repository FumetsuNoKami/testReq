const url = "http://localhost:5249/employee";
const modal = document.getElementsByClassName("modal")[0];
const postBtn = document.getElementsByClassName("postBtn")[0];
postBtn.addEventListener("click", async () => {
  try {
    const inputs = document.querySelectorAll("input");
    const data = {
      id: inputs[0].value,
      fullName: inputs[1].value,
      passport: inputs[2].value,
      dateBirth: inputs[3].value,
      post: inputs[4].value,
      education: inputs[5].value,
      payday: inputs[6].value,
      idDepartment: inputs[7].value,
    };
    console.log(data);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log("Успех:", JSON.stringify(json));
    data.id++;
  } catch (error) {
    console.error("Ошибка:", error);
  }
  modal.style.display = "none";
  overlay.style.display = "none";
});

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

const showBtn = document.getElementsByClassName("showModal")[0];
const overlay = document.getElementsByClassName("overlay")[0];
showBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  overlay.style.display = "block";
  postBtn.focus();
});
