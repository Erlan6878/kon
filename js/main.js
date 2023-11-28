let kn = document.querySelector("#kn");
let number = document.querySelector("#number");
let name = document.querySelector("#name");
let btn = document.querySelector(".btn");
let div = document.querySelector(".div");

let list = document.querySelector(".task-list")

btn.addEventListener("click", () => {
  if (!kn.value.trim()) {
    alert("Заполните поле!");
    return;
  }
  if (!number.value.trim()) {
    alert("Заполните поле!");
    return;
  }
  if (!name.value.trim()) {
    alert("Заполните поле!");
    return;
  }
  let img = document.createElement("img");
  document.body.appendChild(img);
  div.innerHTML += `<img src="${kn.value}" alt="" style="width:200px"><h1>${name.value}</h1><h3>${number.value}</h3>`;
  alert("");
  let obj = {
    task2: kn.value,
    task: number.value,
    task1: name.value,
  };
  setItemToStorage(obj);
});

function setItemToStorage(task) {
  let data = JSON.parse(localStorage.getItem("task-data")) || [];
  data.push(task);
  localStorage.setItem("task-data", JSON.stringify(data));
}
function setItemToStorage(task1) {
  let data = JSON.parse(localStorage.getItem("task-data")) || [];
  data.push(task1);
  localStorage.setItem("task-data", JSON.stringify(data));
}
function setItemToStorage(task2) {
  let data = JSON.parse(localStorage.getItem("task-data")) || [];
  data.push(task2);
  localStorage.setItem("task-data", JSON.stringify(data));
}
//----------------------------------------------------
function createElement() {
  if (!localStorage.getItem("task-data")) {
    localStorage.setItem("task-data", "[]");
  }
  let newData = JSON.parse(localStorage.getItem("task-data"));

  list.innerHTML = "";
  newData.forEach((item, index) => {
    let li = document.createElement("li");
    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");
    btnDelete.innerText = "Delete";
    btnEdit.innerText = "Edit";
    // обробочик события
    btnDelete.addEventListener("click", () => {
      deleteElement(index);
    });
    btnEdit.addEventListener("click", () => {
      editElement(index);
    });
    li.innerText = item.task;
    li.appendChild(btnDelete);
    li.append(btnEdit);
    list.appendChild(li);
  });
}
createElement();

function deleteElement(index) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.splice(index, 1);
  localStorage.setItem("task-data", JSON.stringify(data));
  createElement();
}

let mainModal = document.querySelector(".main-modal");
let inpEdit = document.querySelector(".inp-edit");
let btnClose = document.querySelector(".btn-close");

function editElement(index) {
  mainModal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("task-data"));
  inpEdit.setAttribute("id", index);
  inpEdit.value = data[index].task;
}

let btnSave = document.querySelector(".btn-save");
btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("task-data"));
  let index = inpEdit.id;
  if (!inpEdit.value.trim()) {
    alert("Заполните поле");
    return;
  }
  let newTask = {
    task: inpEdit.value,
  };
  data.splice(index, 1, newTask);
  localStorage.setItem("task-data", JSON.stringify(data));
  mainModal.style.display = "none";
  createElement();
});

btnClose.addEventListener("click", () => {
  mainModal.style.display = "none";
});
