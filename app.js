const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');

// Add EventListener to button
todoButton.addEventListener('click' , addTodo);
todoList.addEventListener('click' , deletecheck);


// Function

function addTodo(event){
    event.preventDefault();
    
    // create new div element
    const newdiv = document.createElement('div');
    newdiv.classList.add('todo');

    // create new li
    const newLi = document.createElement('li')
    newLi.innerText = todoInput.value;
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
    todoInput.value = '';
}

function deletecheck(e){
    const item = e.target;

    //delete todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
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