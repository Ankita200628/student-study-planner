let tasks = JSON.parse(localStorage.getItem("studyTasks") || "[]");

function save() {
  localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const priority = document.getElementById("priority");
  const name = input.value.trim();

  if (!name) {
    alert("Please enter a study task.");
    return;
  }

  tasks.push({ id: Date.now(), name, priority: priority.value, done: false });
  input.value = "";
  save();
  render();
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  save();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
  render();
}

function render() {
  const list = document.getElementById("taskList");
  const count = document.getElementById("count");

  list.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task" + (task.done ? " done" : "");
    li.innerHTML = `
      <label>
        <input type="checkbox" ${task.done ? "checked" : ""}
          onchange="toggleTask(${task.id})">
        <span class="name">${escapeHtml(task.name)}</span>
        <span class="badge">${task.priority}</span>
      </label>
      <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
    `;
    list.appendChild(li);
  });

  count.textContent = `${tasks.length} task${tasks.length === 1 ? "" : "s"}`;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

render();
