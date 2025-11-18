// simulando una base de datos
let tasks = [];
const renderTasks = () => {
    const tasksContainer = document.querySelector('#tasks');
    tasksContainer.innerHTML = '';
    tasks.forEach((el) => {
        const div = document.createElement('div');
        div.className = 'task' + (el.done?" task-done":"");
        div.innerHTML = `
            <span>${el.text}</span>
            <div class="buttons"></div>
                <button class="done" onclick="toggleDone(${el.id})">${el.done ? 'Undo' : 'Done'}</button>
                <button class="edit" onclick="editTask(${el.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${el.id})">Delete</button>
            </div>
        `;
        tasksContainer.appendChild(div);
    });
};

// crear funcion para agregar tarea
const addTask = () => {
    const Input = document.querySelector('#task-input');
    Swal.fire({
  title: "Tarea agregada con éxito",
  icon: "success",
  draggable: true
});
    // validacion para evitar espacios en blanco
    const cleanText = Input.value.trim();
    // valicacion para evitar tareas vacias
    if (cleanText=="") return Swal.fire({
  icon: "error",
  title: "Agregar tarea",
  text: "El campo de tarea no puede estar vacío",
});
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
    const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
Toast.fire({
  icon: "success",
  title: "Tarea terminada"
});
    tasks = tasks.map((el) => el.id === id ? {...el, done: !el.done} : el);
    renderTasks();
}
// editar tarea
const editTask = async (id) => {
    const taskToEdit = tasks.find((el) => el.id === id);

    const { value: newText } = await Swal.fire({
        title: "Editar tarea",
        input: "text",
        inputLabel: "Modifica la tarea",
        inputValue: taskToEdit.text,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        inputValidator: (value) => {
            if (!value || value.trim() === "") {
                return "⚠️ Debes ingresar un texto válido.";
            }
        }
    });

    // Si el usuario cancela
    if (!newText) return;

    const cleanText = newText.trim();

    tasks = tasks.map((el) =>
        el.id === id ? { ...el, text: cleanText } : el
    );

    Swal.fire({
        icon: "success",
        title: "Tarea actualizada ✨",
        showConfirmButton: false,
        timer: 1500
    });

    renderTasks();
};


// eliminar tarea    const newText = prompt("Edita la tarea:", taskToEdit.text);
const deleteTask = (id) => {
    Swal.fire({
  title: "¿Estás seguro de eliminar esta tarea?",
  text: "¡No podrás revertir esto!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Sí, eliminar!",
  cancelButtonText: "Cancelar"
}).then((result) => {
  if (result.isConfirmed) {
    tasks = tasks.filter((el) => el.id !== id);
    Swal.fire({
      title: "Eliminado!",
      text: "Tu tarea ha sido eliminada.",
      icon: "success"
    });
  }
  renderTasks();
});
}