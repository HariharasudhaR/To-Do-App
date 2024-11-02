let tasks = [];

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskDate = document.getElementById("task-date");
    const taskText = taskInput.value.trim();
    const taskTime = taskDate.value;

    if (taskText === "" || taskTime === "") {
        alert("Please enter a task and date.");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        time: taskTime,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = "";
    taskDate.value = "";
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";
        taskItem.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.text} - ${new Date(task.time).toLocaleString()}
            </span>
            <div>
                <button onclick="toggleTask(${task.id})">Mark ${task.completed ? "Incomplete" : "Complete"}</button>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    renderTasks();
}

function editTask(id) {
    const newText = prompt("Edit your task:");
    const newDate = prompt("Edit date and time (YYYY-MM-DDTHH:MM):");
    if (newText && newDate) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                task.text = newText;
                task.time = newDate;
            }
            return task;
        });
    }
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}