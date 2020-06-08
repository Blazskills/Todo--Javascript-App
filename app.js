// Default UI Vars

const form = document.querySelector('#todo-form')
const todoInput = document.querySelector('#todo')
const addbtn = document.querySelector('.add')
const todoList = document.querySelector('.collection')


//Load All Todo Event 

loadEventListerners()

//Function For Listerners

function loadEventListerners() {
  //DOM LOAD EVENT FROM Local Storage
  document.addEventListener('DOMContentLoaded', getTodos)
  //Adding Todo
  form.addEventListener('submit', addTodo);
  //Remove todo list one by one
  todoList.addEventListener('click', removeTodo);

}


//Get Todo From Local Storage
function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
    return false
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))

  }
  todos.forEach(function (todo) {
    //Create li
    const li = document.createElement('li')

    //Create div
    const div = document.createElement('div')
    //Add class to div created
    div.className = 'form-check';
    //create text node and append to li
    div.appendChild(document.createTextNode(todo));
    // Append the link to li
    li.appendChild(div);

    const link = document.createElement('a')
    //Add class
    link.className = 'delete-item secondary-content';

    //Add icon html
    link.innerHTML = '<i class="remove mdi mdi-close-circle-outline"></i>';
    // Append the link to li
    div.appendChild(link);



    //Append li to ul
    todoList.appendChild(div)

  })
}


//Add Todo To UI and Trigger LOcalStorage storing with UI-Todo
function addTodo(e) {
  if (todoInput.value === '') {
    alert('Todo Can\'t be empty')
    return false;
  } {
    //Create li
    const li = document.createElement('li')

    //Create div
    const div = document.createElement('div')
    //Add class to div created
    div.className = 'form-check';
    //create text node and append to li
    div.appendChild(document.createTextNode(todoInput.value));
    // Append the link to li
    li.appendChild(div);

    const link = document.createElement('a')
    //Add class
    link.className = 'delete-item secondary-content';

    //Add icon html
    link.innerHTML = '<i class="remove mdi mdi-close-circle-outline"></i>';
    // Append the link to li
    div.appendChild(link);

    //Append li to ul
    todoList.appendChild(div)

    //Store in LS
    storeTodoInLocalStorage(todoInput.value);
    console.log(li);
    //Clear Input After Collected

    todoInput.value = '';

  }

  e.preventDefault()

}

//Remove from UI
function removeTodo(e) {

  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure You want to delete ?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
  //Remove from LS
  removeTodoFormLocalStorage(e.target.parentElement.parentElement)
}

function removeTodoFormLocalStorage(todoItem) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
    return false;
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))

  }
  todos.forEach(function (todo, index) {
    if (todoItem.textContent === todo) {
      todos.splice(index, 1)

    }
  })
  localStorage.setItem('todos', JSON.stringify(todos))
}


//Add Or Store Task Into Local Storage
function storeTodoInLocalStorage(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))

  }

  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}

