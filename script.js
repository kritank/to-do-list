const addButton = document.getElementById("add-button");
const clearCompletedButton = document.getElementById("clear-completed-button");
const emptyListButton = document.getElementById("empty-button");
// const saveListButton = document.getElementById("save-button");
const toDoEntryBox = document.getElementById("todo-entry-box");
const toDoList = document.getElementById("todo-list");


//adding listeners to the buttons
addButton.addEventListener("click", addToDoItem);
clearCompletedButton.addEventListener("click", clearCompletedToDoItems);
emptyListButton.addEventListener("click", emptyList);
// saveListButton.addEventListener("click", saveList);
toDoEntryBox.addEventListener("keyup", function(event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === 13) {
        addButton.click();
    }
  });

//button functions
function clearCompletedToDoItems() {
    let completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
    saveList();
}

function emptyList() {
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
    saveList();
}

function saveList() {
    var toDos = [];

    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);

    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function addToDoItem() {
    let itemText = toDoEntryBox.value;
    if(itemText!= ""){
        newToDoItem(itemText, false);
        toDoEntryBox.value="";
        saveList();
    }
    else alert("Enter some description first!");
    
}


//helper functions
function newToDoItem(itemText, completed) {
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed) {
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}

function loadList() {
    if (localStorage.getItem("toDos") !== null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}
loadList(); //refresh the list each time the page is refreshed