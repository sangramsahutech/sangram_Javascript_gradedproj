const inputValue = document.getElementById("itembox1");
const viewList = document.getElementById("viewList");
const addToDo = document.getElementById('add-btn');
let todoArray = []
window.onload = initialDisplay

function initialDisplay() {
    let todo = localStorage.getItem("todo");
    if (todo === null) {
      todoArray = [];
    } else {
      todoArray = JSON.parse(todo);
    }
    let htmlCode = "";
    todoArray.forEach((list, ind) => {
        htmlCode = htmlCode + `<li class="row-view">
            <input type="text" class="view-container" value=${list} disabled></input>
            <button id="edit-btn" onclick="edit(${ind})">Edit</button>
            <button id="save-btn" onclick="save(${ind})" style="display: none">Save</button>
            <button id="delete-btn" onclick = "deletetodo(${ind})">Delete</button>
        </li>`;
    });
    console.log(htmlCode);
    viewList.innerHTML = htmlCode;
}

addToDo.onclick=(e) => {
    let todo = localStorage.getItem("todo");
    if(todo === null){
        todoArray = []
    } else {
        todoArray = JSON.parse(todo);
    }
    todoArray.push(inputValue.value);
    inputValue.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    initialDisplay();
}

function edit(ind) {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    let ulitem = document.getElementById("viewList");
    let liitems = ulitem.getElementsByTagName("li");
    for(let i=0;i<liitems.length;i++){
        if(ind === i ){
            liitems[i].children[0].removeAttribute("disabled");
            liitems[i].children[1].style.display = "none";
            liitems[i].children[2].style.display = "inline-block";
            liitems[i].children[0].classList.add("selected");
        }
    }
}

function save(ind) {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    let ulitem = document.getElementById("viewList");
    let liitems = ulitem.getElementsByTagName("li");
    for(let i=0;i<liitems.length;i++){
        if(ind === i ){
            liitems[i].children[0].innerHTML = liitems[i].children[0].value;
            liitems[i].children[0].disabled = true;
            liitems[i].children[0].classList.remove("selected");
            liitems[i].children[2].style.display = "none";
            liitems[i].children[1].style.display = "inline-block";
        }    
    }
}

function deletetodo(ind) {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    todoArray.splice(ind, 1);
    localStorage.setItem("todo", JSON.stringify(todoArray));
    initialDisplay();
}
