class Main {
  _newTaskElement(taskText, checked) {
    let done = null;
    if (checked) done = 'checked';
    return `
      <input class="task" type="checkbox" ${done} name="tasck-check" id="task-check">
      <span class="task__text">${taskText}</span>
      <button class="task__delete">Удалить</button>
            `
  }
  _deleteTask(elem) {
    elem.remove();
  }
  addTask(taskText, checked) {
    let taskValue;
    if (!taskText) {
      taskValue = document.querySelector('.add_task__input');
      taskText = taskValue.value;
      taskValue.value = '';
    }
    let taskElement = document.createElement('li');
    taskElement.innerHTML = this._newTaskElement(taskText, checked);
    taskElement.classList.add('task')
    document.querySelector('.task-list').appendChild(taskElement)
    let delButton = taskElement.querySelector('.task__delete');
    delButton.addEventListener('click', () => this._deleteTask(taskElement));
  }

}

export default Main