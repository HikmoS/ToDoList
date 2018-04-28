


var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    completed: []
};


document.getElementById("add").addEventListener("click",buttonClick);
renderTodoList();

function buttonClick(){
    var value  = document.getElementById("item").value;
    if(value) {
        
        addItemTodo(value);
        data.todo.push(value);
        document.getElementById("item").value = '';   
        dataObjectUpdated();
        
    }
}

function renderTodoList(){
    if(!data.todo.length && !data.completed.length) return;

    for(var i = 0; i < data.todo.length; i++){
        var value = data.todo[i];
        addItemTodo(value);
    }

    for(var j = 0; j < data.completed.length; j++){
        var value = data.completed[j];
        addItemTodo(value,true);
    }
}


function dataObjectUpdated(){

    localStorage.setItem('todoList', JSON.stringify(data));
}


function completeItem(){
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;
    let id = parent.id;
    let value = item.innerText;

    if(id === 'todo'){
        data.todo.splice(data.todo.indexOf(value)); //bak
        data.completed.push(value);
    }else{
        data.completed.splice(data.completed.indexOf(value)); //bak
        data.todo.push(value);
    }

    dataObjectUpdated();


    let target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo'); //bak

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);


}

function removeItem(){
    // console.log(this.parentNode.parentNode);
    let item = this.parentNode.parentNode; // li
    let parent = item.parentNode; // ul
    let id = parent.id;
    let value = item.innerText;

    if(id === 'todo'){
        data.todo.splice(data.todo.indexOf(value)); //bak
    }else{
        data.completed.splice(data.completed.indexOf(value)); //bak
    }

    dataObjectUpdated();

    parent.removeChild(item);

}


function addItemTodo(text,completed){

    let list = (completed) ? document.getElementById('completed') : document.getElementById('todo');

    let item = document.createElement('li');
    item.innerText = text;

    let buttons = document.createElement('div');
    buttons.classList.add('buttons');

    let remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = "Delete";

    remove.addEventListener("click", removeItem);

    let complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = "Complete";


    complete.addEventListener("click", completeItem);


    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(buttons);

    list.insertBefore(item,list.childNodes[0]);
    
}






