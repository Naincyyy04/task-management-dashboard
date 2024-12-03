let tasks = [];

document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-desc').value;
  const dueDate = document.getElementById('task-date').value;

  if (title && dueDate) {
    const task = {
      id: Date.now(),
      title,
      description,
      dueDate,
      completed: false
    };
    tasks.push(task);
    renderTasks(tasks);
    clearForm();
  }
}

function clearForm() {
  document.getElementById('task-title').value = '';
  document.getElementById('task-desc').value = '';
  document.getElementById('task-date').value = '';
}

function renderTasks(filteredTasks) {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  filteredTasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task ${task.completed ? 'completed' : ''}`;
    taskDiv.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Due: ${task.dueDate}</p>
      <button onclick="toggleComplete(${task.id})">
        ${task.completed ? 'Mark as Pending' : 'Mark as Completed'}
      </button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(taskDiv);
  });
}

function toggleComplete(id) {
  tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
  renderTasks(tasks);
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks(tasks);
}

function filterTasks(filter) {
  let filteredTasks;
  const currentDate = new Date().toISOString().split('T')[0];

  if (filter === 'all') {
    filteredTasks = tasks;
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (filter === 'pending') {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (filter === 'overdue') {
    filteredTasks = tasks.filter(task => task.dueDate < currentDate && !task.completed);
  }

  renderTasks(filteredTasks);
}
