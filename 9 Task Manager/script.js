let tasks = JSON.parse(localStorage.getItem('todo_tasks')) || [];

const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskPrioritySelect = document.getElementById('task-priority');
const tasksList = document.getElementById('tasks-list');
const statusFilter = document.getElementById('status-filter');

const totalTasksCounter = document.getElementById('total-tasks');
const completedTasksCounter = document.getElementById('completed-tasks');
const pendingTasksCounter = document.getElementById('pending-tasks');

function saveToLocalStorage() {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
}

function updateCounters() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    totalTasksCounter.textContent = total;
    completedTasksCounter.textContent = completed;
    pendingTasksCounter.textContent = pending;
}

function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveToLocalStorage();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveToLocalStorage();
    renderTasks();
}

function renderTasks() {
    tasksList.innerHTML = '';

    const currentFilter = statusFilter.value;

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'Completed') return task.completed;
        if (currentFilter === 'Pending') return !task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item priority-${task.priority} ${task.completed ? 'completed' : ''}`; 
        // new learning ternary operator: => condition ? expression_if_true : expression_if_false;
        li.innerHTML = `
            <div class="task-content">
                <span class="task-text">${task.title}</span>
                <span class="task-badge">${task.priority} Priority</span>
            </div>
            <div class="task-actions">
                <button class="comp-btn" onclick="toggleComplete(${task.id})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="del-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        tasksList.appendChild(li);
    });

    updateCounters();
}

taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const titleValue = taskTitleInput.value.trim();
    const priorityValue = taskPrioritySelect.value;

    if (!titleValue) return;

    const newTask = {
        id: Date.now(),
        title: titleValue,
        priority: priorityValue,
        completed: false
    };

    tasks.push(newTask);
    saveToLocalStorage();
    renderTasks();

    taskTitleInput.value = '';
    taskPrioritySelect.value = 'Medium';
});

statusFilter.addEventListener('change', renderTasks);

renderTasks();
