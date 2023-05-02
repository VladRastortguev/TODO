let btn = document.querySelector(".btn");
let input = document.querySelector(".taskInput");
let list = document.querySelector(".taskList");

btn.addEventListener("click", () => {
  if (!input.value.trim()) {
    alert("Заполните полe!");
    return;
  }

  let obj = {
    task: input.value,
  };

  setItemToStorage(obj);

  createElement();

  input.value = "";
});

function setItemToStorage(task) {
  if (!localStorage.getItem("tasksData")) {
    localStorage.setItem("tasksData", "[]");
  }

  let data = JSON.parse(localStorage.getItem("tasksData"));

  data.push(task);

  localStorage.setItem("tasksData", JSON.stringify(data));
}

function createElement() {
  let newData = JSON.parse(localStorage.getItem("tasksData"));

  list.innerHTML = "";

  let newArr = newData?.map((item, index) => {
    let li = document.createElement("li");
    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");

    li.innerText = item.task;
    btnDelete.innerText = "Detete";
    btnEdit.innerText = "Edit";

    li.appendChild(btnDelete);
    li.append(btnEdit);

    btnDelete.addEventListener("click", () => {
      deleteElement(index);
    });

    btnEdit.addEventListener("click", () => {
      editElement(index);
    });

    list.append(li);
  });
}

function deleteElement(index) {
  let data = JSON.parse(localStorage.getItem("tasksData"));
  data.splice(index, 1);

  localStorage.setItem("tasksData", JSON.stringify(data));

  createElement();
}

createElement();

let mainModal = document.querySelector(".mainModal");
let inpEdit = document.querySelector(".inpEdit");
let btnCloser = document.querySelector(".btnCloser");
let btnSave = document.querySelector(".btnSave");

function editElement(index) {
  mainModal.style.display = "block";

  let data = JSON.parse(localStorage.getItem("tasksData"));

  inpEdit.setAttribute("id", index);
  inpEdit.value = data[index].task;
}

btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("tasksData"));
  let index = inpEdit.id;

  if (!inpEdit.value.trim()) {
    alert("Заполните поле!");
    return;
  }

  let newTask = {
    task: inpEdit.value,
  };

  data.splice(index, 1, newTask);

  localStorage.setItem("tasksData", JSON.stringify(data));

  mainModal.style.display = "none";

  createElement();
});

btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});
