class Remote {
  getTasks() {
    let data = JSON.parse(localStorage.getItem('todoListAppTasks'));
    if (data == null) return [];
    return data;
    
  }
  setTasks(tasks) {
    localStorage.setItem('todoListAppTasks', JSON.stringify(tasks));
  }
}

export default Remote;