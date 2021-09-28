const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')
// Add EventListener to button
todoButton.addEventListener('click' , addTodo);
todoList.addEventListener('click' , deletecheck);
filterOption.addEventListener('click' , filterTodo);
document.addEventListener('DOMContentLoaded' , getTodo)
// Function

function addTodo(event){
    event.preventDefault();
    if(todoInput.value.length != 0){
    // create new div element
    const newdiv = document.createElement('div');
    newdiv.classList.add('todo');

    // create new li
    const newLi = document.createElement('li')
    newLi.innerText = todoInput.value;
    newLi.classList.add('todo-item');
    newdiv.appendChild(newLi);
    //add todo to a local storage
    saveLocalTodos(todoInput.value);

    //create button complete
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    newdiv.appendChild(completeButton);

    //create trash complete
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    newdiv.appendChild(trashButton);

    todoList.appendChild(newdiv);
    todoInput.value = '';
}}

function deletecheck(e){
    const item = e.target;

    //delete todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodo(todo);
        // add addEventListener because when animation done then remove the todo
        todo.addEventListener('transitionend' , function(){
          todo.remove();
        })  
    }
    //check mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
  var todos = todoList.childNodes;
  todos.forEach(function(todo){
      switch(e.target.value){
          case "all":
            
              break; 
              
              case "completed":
                 
              if(todo.classList.contains("completed")){
                  todo.style.display = "flex";
              }    else{
                  todo.style.display= "none";
              }
              break;

              case "uncompleted":
                if(todo.classList.contains("uncompleted")){
                    todo.style.display = "flex";
                }    else{
                    todo.style.display= "none";
                }
                break;
        
      }
  })
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos' , JSON.stringify(todos));
}

function getTodo(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
        const newdiv = document.createElement('div');
    newdiv.classList.add('todo');

    // create new li
    const newLi = document.createElement('li')
    newLi.innerText = todo;
    newLi.classList.add('todo-item');
    newdiv.appendChild(newLi);
    
    //create button complete
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    newdiv.appendChild(completeButton);

    //create trash complete
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    newdiv.appendChild(trashButton);

    todoList.appendChild(newdiv);
    })
}

function removeLocalTodo(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    var todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex) ,1);
    localStorage.setItem('todos' , JSON.stringify(todos));
}
