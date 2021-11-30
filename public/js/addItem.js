const activity = document.getElementById("activity");
const description = document.getElementById("description");
const date = document.getElementById("start");
const addTaskButton = document.getElementById("add-task-btn");
const saveTaskButton = document.getElementById("save-todo-btn");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");

// initialize array to store
let todoArray = [];
//add items
addTaskButton.addEventListener("click", (e) => {
  if (activity.value == "") {
    alert("please fill out the activity's information");
  } 
  else if(date.value == ""){
    alert("please fill out the date");
  }
  else {
    e.preventDefault();
    let todo = localStorage.getItem("todo");
    if (todo === null) {
      todoArray = [];
    } else {
      todoArray = JSON.parse(todo);
    }
    item = activity.value + ":" + description.value + " " + date.value;
    todoArray.push(item);
    activity.value = "";
    description.value = "";
    date.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
  }
});

//display
function displayTodo() {
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  let htmlCode = "";
  todoArray.forEach((list, ind) => {
    htmlCode += `<div class='flex mb-4 items-center'>
    <p class='w-full text-grey-darkest'>${list}</p>
    <button onclick='edit(${ind})' class='flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-white text-grey bg-green-600'>Edit</button>
    <button onclick='deleteTodo(${ind})' class='flex-no-shrink p-2 ml-2 border-2 rounded text-white bg-red-500'>Delete</button>
</div>`;
  });
  listBox.innerHTML = htmlCode;
}

//deleting

function deleteTodo(ind) {
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  todoArray.splice(ind, 1);
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
}

//edit
function edit(ind) {
  saveInd.value = ind;
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  activity.value = todoArray[ind];
  addTaskButton.style.display = "none";
  saveTaskButton.style.display = "block";
}

//save task

saveTaskButton.addEventListener("click", () => {
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  let id = saveInd.value;
  todoArray[id] = activity.value;
  addTaskButton.style.display = "block";
  saveTaskButton.style.display = "none";
  activity.value = "";
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
});
