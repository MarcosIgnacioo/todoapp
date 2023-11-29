let localTasks = localStorage.getItem("tasks");
if (!localStorage.getItem('tasksIds')) {
    localStorage.setItem("tasksIds", 0)
}
if (!localStorage.getItem('completedTasks')){
    localStorage.setItem('completedTasks', 0);
}
if (!localTasks) {
    localStorage.setItem("tasks", "[]");
}
updateCompletedTasks();
localTasks = getSavedTasks();

const addTask = document.querySelector("#add_task");
addTask.addEventListener('click', saveTask);
console.log(localTasks);
if (JSON.parse(localTasks).length !== 0) {
    renderEachTask(JSON.parse(localTasks));
}
console.log(localTasks);
function getSavedTasks() {
    return localStorage.getItem("tasks")
}
function saveTask() {
    const task = getTask();
    if (task.length !== 0) {
        let taskId = parseInt(localStorage.getItem("tasksIds"));
        const tasksList = localStorage.getItem('tasks');
        let tasksListBuffer = [];
        if (tasksList) {
            tasksListBuffer = JSON.parse(tasksList);
        }
        const newTask = { id: taskId, taskToDo: task, isDone: false }
        tasksListBuffer.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasksListBuffer));
        renderNewTask(newTask)
        localStorage.removeItem("tasksIds");
        localStorage.setItem("tasksIds", ++taskId)
    } else {
        alert("Ingrese una tarea")
    }
}
function getTask() {
    return document.querySelector("#task_input").value;
}
function isEmptyTask(task) {
    return task.lenght !== 0;
}

function renderNewTask(newTask) {
    const { id, taskToDo, isDone } = newTask;
    const taskContainer = document.createElement('li');

    const newTaskLabel = document.createElement('span');
    
    const taskCheckButton = document.createElement('input');
    taskCheckButton.setAttribute('type', 'checkbox');
    taskCheckButton.checked = isDone;
    taskCheckButton.addEventListener('click', () => {
        const localTasks = JSON.parse(getSavedTasks());
        localTasks.map(task => {
            if (task.id === id){
                let completedTasks = parseInt(localStorage.getItem('completedTasks'));
                task.isDone = taskCheckButton.checked;
                if (taskCheckButton.checked){
                    newTaskLabel.style.textDecoration = 'line-through';
                    localStorage.setItem('completedTasks', ++completedTasks);
                }else{
                    newTaskLabel.style.textDecoration = 'none';
                    localStorage.setItem('completedTasks', --completedTasks);
                }
                updateCompletedTasks();
            }
        })
        localStorage.removeItem('tasks');
        localStorage.setItem('tasks', JSON.stringify(localTasks))
    })
    taskContainer.appendChild(taskCheckButton);
    
    newTaskLabel.textContent = taskToDo;
    taskContainer.appendChild(newTaskLabel);
    
    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.textContent = "Borrar";
    deleteTaskButton.addEventListener('click', () => {
        let completedTasks = parseInt(localStorage.getItem('completedTasks'));
        localStorage.setItem('completedTasks', --completedTasks);
        updateCompletedTasks();
        let localTasks = JSON.parse(getSavedTasks());
        const deletingTask = {id: id, taskToDo: taskToDo, isDone: isDone}
        localTasks = localTasks.filter(task => task.id !== deletingTask.id);
        localStorage.removeItem('tasks');
        localStorage.setItem('tasks', JSON.stringify(localTasks));
        document.querySelector('.tasks_created').removeChild(taskContainer)
    });
    taskContainer.appendChild(deleteTaskButton);
    document.querySelector('.tasks_created').appendChild(taskContainer);
}
function renderEachTask(storagedTasks) {
    if (storagedTasks.length !== 0) {
        for (const task of storagedTasks) {
            renderNewTask(task);
        }
    }
}
function updateCompletedTasks(){
    document.querySelector("#completed_tasks").textContent = "Tareas completadas: " + localStorage.getItem('completedTasks');

}