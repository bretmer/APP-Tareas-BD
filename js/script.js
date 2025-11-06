// simulando una base de datos
let tasks = [];
const renderTasks = () => {
    const tasksContainer = document.querySelector('#tasks');
    tasksContainer.innerHTML = '';
    tasks.forEach((el) => {
        const div = document.createElement('div');
        div.className = 'task' + (el.done?" done":"");
        div.innerHTML = `
            <span>${el.text}</span>
            <div></div>
                <button onclick="toggleDone(${el.id})">${el.done ? 'Undo' : 'Done'}</button>
                <button onclick="editTask(${el.id})">Edit</button>
                <button onclick="deleteTask(${el.id})">Delete</button>
            </div>
        `;
        tasksContainer.appendChild(div);
    });
};

// crear funcion para agregar tarea
const addTask = () => {
    const Input = document.querySelector('#task-input');
    // validacion para evitar espacios en blanco
    const cleanText = Input.value.trim();
    // valicacion para evitar tareas vacias
    if (cleanText=="") return alert("La tarea no puede estar vacía");
    const newTask = {
        id: Date.now(),
        text: cleanText,
        done: false
    };
    tasks.push(newTask);
    Input.value = '';
    renderTasks();
};

const toggleDone = (id) => {
    tasks = tasks.map((el) => el.id === id ? {...el, done: !el.done} : el);
    renderTasks();
}