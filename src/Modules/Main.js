import Remote from './Remote';
class Main {
  constructor(selector){
    let btnAdd = document.querySelector(selector);
    btnAdd.addEventListener('click', () => this._addTaskElement());
    let addTaskForm = document.querySelector('.add-task__input');
    addTaskForm.addEventListener('keypress', (event) => this._enterHandler(event));
    this.remote = new Remote();
    this.tasks = this.remote.getTasks();
    this.updateList();
  }
  //Отслеживание нажания клавиши Enter во время ввода текста
  _enterHandler(e) {
    e.key === 'Enter' ? this._addTaskElement() : () => {};
  }
  //Отслеживание checkbox
  _checkHandler(e){ 
    let target = e.target;
    if (target.className != 'task__check' ) return;
    //this._checkHandler(target);
    let taskText = target.nextElementSibling.innerText;
    this.tasks[this.tasks.findIndex(task => task.text === taskText)].check = target.checked;   
    this.remote.setTasks(this.tasks)
  }
  //Получение текста новой задачи
  _getNewTaskText() {
    let inputElement = document.querySelector('.add-task__input');
    let retValue = inputElement.value;
    inputElement.value = '';
    inputElement.focus();
    return retValue;
  }
  //Создание нового эемента DOM
  _createTaskElement(taskText, checked) {
    let done = null;
    if (checked) done = 'checked';
    let inner =  `
      <input class="task__check" type="checkbox" ${done} name="tasck-check" id="task-check">
      <span class="task__text">${taskText}</span>
      <button class="task__delete btn btn-danger">Del</button>
            `
    let taskElement = document.createElement('li');
    taskElement.innerHTML = inner;
    taskElement.classList.add('task');
    taskElement.addEventListener('click', (e) => this._checkHandler(e));
    taskElement.querySelector('.task__delete').addEventListener('click', () => {this._deleteTaskElement(taskText)}, false);    
    return taskElement;
  }
  //Добавление нового элемента в DOM
  _addTaskElement() {
    this.tasks.push({text: this._getNewTaskText(), checked: false})
    this.updateList(() => this.remote.setTasks(this.tasks));
  }
  //Удаление элемента из DOM
  _deleteTaskElement(text) {
    this.tasks.splice(this.tasks.findIndex(task => task.text === text), 1);
    this.updateList(() => this.remote.setTasks(this.tasks));
    
  }
  //Обновление элемента с заданиями
  updateList(remoteCallback) {
    let f = remoteCallback || (() => {});
    let listElement = document.querySelector('.task-list');
    listElement.innerHTML = '';
    this.tasks.map((task) => {
      let taskElement = this._createTaskElement(task.text, task.check);
      listElement.appendChild(taskElement);
    });  
    f(this.tasks);    
  }
}

export default Main