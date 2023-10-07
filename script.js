document.addEventListener("DOMContentLoaded", function () {
  // Your JavaScript code here
  const itemsArray = localStorage.getItem("items") //items = key
    ? JSON.parse(localStorage.getItem("items"))
    : [];
  console.log(itemsArray);

  document.getElementById("add").addEventListener("click", () => {
    const task = document.getElementById("task");
    addTask(task); //item = task
  });

  // add button function
  function addTask(task) {
    try {
      itemsArray.push(task.value);
      localStorage.setItem("items", JSON.stringify(itemsArray));
      // console.log("Task added successfully.");
      task.value = "";
      displayitems();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  //  Enter key functionality
  const add = document.getElementById("add");
  task.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      add.click();
    }
  });

  function displayitems() {
    let items = "";
    for (let i = 0; i < itemsArray.length; i++) {
      items += `
        <div className="item">
            <div class="input-controller">
              <textarea disabled> ${itemsArray[i]}</textarea>
              <div class="edit-controller">
              <button class="delete">
              <i class="fa-solid fa-trash"></i></button>
              <button class="edit">
              <i class="fa-solid fa-pen-to-square"></i></button>
              </div>
            </div>
          </div>
          <div class="update-controller">
            <button class="save"> Save</button>
            <button class="cancel">Cancel</button>
          </div>

        `;
    }
    document.querySelector("#task-list").innerHTML = items;
    activateDelete();
    activateEdit();
    activateSave();
    activateCancel();
  }
  // Delete function
  function activateDelete() {
    let deleteBtn = document.querySelectorAll(".delete");
    deleteBtn.forEach((db, i) => {
      db.addEventListener("click", () => {
        deleteItem(i);
      });
    });
  }

  function deleteItem(i) {
    itemsArray.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    location.reload();
  }

  // edit function
  function activateEdit() {
    const editBtn = document.querySelectorAll(".edit");
    let updateController = document.querySelectorAll(".update-controller");
    let inputs = document.querySelectorAll(".input-controller textarea");
    editBtn.forEach((eb, i) => {
      eb.addEventListener("click", () => {
        updateController[i].style.display = "block";
        inputs[i].disabled = false;
      });
    });
  }

  // Save function
  function activateSave() {
    const saveBtn = document.querySelectorAll(".save");
    let inputs = document.querySelectorAll(".input-controller textarea");
    saveBtn.forEach((sb, i) => {
      sb.addEventListener("click", () => {
        updateItem(inputs[i].value, i);
      });
    });
  }
  function updateItem(text, i) {
    itemsArray[i] = text;
    localStorage.setItem("items", JSON.stringify(itemsArray));
    location.reload();
  }

  // cancel function
  function activateCancel() {
    const cancelBtn = document.querySelectorAll(".cancel");
    let updateController = document.querySelectorAll(".update-controller");
    let inputs = document.querySelectorAll(".input-controller textarea");
    cancelBtn.forEach((cb, i) => {
      cb.addEventListener("click", () => {
        updateController[i].style.display = "none";
        inputs[i].disabled = true;
      });
    });
  }

  //   Date function
  function displayDate() {
    let date = new Date();
    date = date.toString().split(" ");
    document.querySelector("#date").innerHTML =
      date[0] + " " + date[1] + " " + date[2] + " " + date[3];
    //   console.log(date);
  }

  window.onload = function () {
    displayDate();
    displayitems();
  };
});
