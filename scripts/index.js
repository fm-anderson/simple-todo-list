const tasksArray = [];
const tasksList = document.querySelector('.tasks__list');
const taskForm = document.querySelector('#taskForm');
const taskInput = document.querySelector('#taskInput');

taskForm.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  addElement(taskInput.value);
  handleNewTask();
}

function handleNewTask() {
  tasksArray.push(taskInput.value);
  taskInput.value = '';
}

function handleCompleteTask(e) {
  e.target.classList.toggle('tasks__checkbox-checked');
  e.target.nextElementSibling.classList.toggle('tasks__checkbox-checked');
  console.log(e);
}

function handleDeleteTask(e) {
  const index = tasksArray.indexOf(e.path[1].children[1].outerText);
  if (index > -1) {
    tasksArray.splice(index, 1);
  }
  e.path[2].remove();
}

function addElement(task) {
  const li = document.createElement('li');
  const div = document.createElement('div');
  const img = document.createElement('img');
  const p = document.createElement('p');
  const button = document.createElement('button');

  li.className = 'tasks__items';
  div.className = 'tasks__container';
  img.className = 'tasks__checkbox';
  p.className = 'tasks__title';
  button.className = 'tasks__delete';

  img.src = './images/checkbox.svg';
  p.textContent = task;
  button.textContent = 'x';

  tasksList.appendChild(li);
  li.appendChild(div);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(button);
}

function delegateEvent(elementClass, action) {
  document.addEventListener('click', function (event) {
    if (
      event.target &&
      event.target.matches &&
      event.target.matches(elementClass)
    ) {
      action(event);
    }
  });
}

delegateEvent('.tasks__checkbox', handleCompleteTask);
delegateEvent('.tasks__delete', handleDeleteTask);
