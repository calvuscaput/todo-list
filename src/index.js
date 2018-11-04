import Main from './Modules/Main';
let main = new Main();
let btnAdd = document.querySelector('.add-task__btn');
btnAdd.addEventListener('click', () => main.addTask());