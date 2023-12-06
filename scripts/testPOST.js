const url = "http://localhost:5249/employee";
const data = {
  id: 100,
  fullName: "Борис Борисович Борисов",
  passport: "7022 983300",
  dateBirth: "1899-01-10",
  post: "Норм чел",
  education: "Низшее",
  payday: 555555,
  idDepartment: 1,
};
const modal = document.getElementsByClassName("modal")[0];
const postBtn = document.getElementsByClassName("postBtn")[0];
postBtn.addEventListener("click", async () => {
  try {
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

const showBtn = document.getElementsByClassName("showModal")[0];
const overlay = document.getElementsByClassName("overlay")[0];
showBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  overlay.style.display = "block";
});
