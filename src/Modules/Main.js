import Remote from './Remote';
class Main {
  constructor(selector){
    let btnAdd = document.querySelector(selector);
    btnAdd.addEventListener('click', () => this._addTaskElement());
  }

  tasks = [];

  _createTaskElement(taskText, checked) {
    let done = null;
    if (checked) done = 'checked';
    let inner =  `
      <input class="task__check" type="checkbox" ${done} name="tasck-check" id="task-check">
      <span class="task__text">${taskText}</span>
      <button class="task__delete">Del</button>
            `
    let taskElement = document.createElement('li');
    taskElement.innerHTML = inner;
    taskElement.classList.add('task');
    taskElement.addEventListener('click', (e) => this._checkListener(e));
    taskElement.querySelector('.task__delete').addEventListener('click', () => {this._deleteTaskElement(taskText)}, false);    
    return taskElement;
  }
  
  //Добавляет таск в лист
  _addTask(taskText, checked) {
    this.tasks.push({text: taskText, check: checked})
  }

  _deleteTask(text) {
    this.tasks.splice(this.tasks.findIndex(task => task.text === text), 1);
  }

  _deleteTaskElement(index) {
    this._deleteTask(index);
    this.updateList();
    
  }

  _addTaskElement() {
      this._addTask(this._getNewTaskText())
     this.updateList();
  }


  _getNewTaskText() {
    let inputElement = document.querySelector('.add_task__input');
    let retValue = inputElement.value;
    inputElement.value = '';
    inputElement.focus();
    return retValue;
  }
  _checkListener(e){ 
    let target = e.target;
    if (target.className != 'task__check' ) return;
    this._checkHandler(target);
  }
  _checkHandler(node) {
    console.log(this.tasks);
    
    let taskText = node.nextElementSibling.innerText;
    this.tasks[this.tasks.findIndex(task => task.text === taskText)].check = node.checked;
    console.log(this.tasks);
    
    
  }
  updateList(remoteCallback) {
    f = remoteCallback || (() => {});
    let listElement = document.querySelector('.task-list');
    listElement;
    listElement.innerHTML = '';
    this.tasks.map((task) => {
      let taskElement = this._createTaskElement(task.text, task.check);
      listElement.appendChild(taskElement);
    });  
    f();    
  }
}

export default Main