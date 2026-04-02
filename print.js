const todos = JSON.parse(localStorage.getItem('todos')) || [];
const statsEl = document.getElementById('stats');
const listEl = document.getElementById('print-list');

const total = todos.length;
const remaining = todos.filter(t => !t.completed).length;

statsEl.textContent = `Total des tâches : ${total} | Tâches non terminées : ${remaining}`;

todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.title;
    if (todo.completed) {
        li.style.textDecoration = 'line-through';
    }
    listEl.appendChild(li);
});