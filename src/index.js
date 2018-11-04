//Получаем html элемента
let newTaskElement = (taskText) => {
    return `
    <li class="task">
    <input class="task" type="checkbox" name="tasck-check" id="task-check">
    <span class="task__text">${taskText}</span>
    <button class="task__delete">Удалить</button>
    </li>
    `
    }
    
    
    //Получение значения из input
    let getTaskText = () => {
        return document.querySelector('.add_task__input').value;
    }
    //Добавление элемента в список
    let addTask = () => {
        let taskListElement = document.querySelector('.task-list');
        let taskElement = document.createElement('li');
        taskElement.innerHTML = newTaskElement(getTaskText())
        taskListElement.appendChild(taskElement);
        removeBtn = taskElement.querySelector('.task__delete').addEventListener('click', () => deleteTask(taskElement));
    }
    
    // Удаление задачи
    let deleteTask = (elem) => {
        elem.remove();
        
    }
    
    //eventlistener для добавления новой задачи
    let addButton = document.querySelector('.add-task__btn');
    addButton.addEventListener('click', addTask);