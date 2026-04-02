let todos = JSON.parse(localStorage.getItem('todos')) || [];
let editingIndex = -1;

const listEl = document.getElementById('todo-list');
const newItemPanel = document.getElementById('new-item');
const editItemPanel = document.getElementById('edit-item');
const newTitleInput = document.getElementById('new-todo-item-title');
const editTitleInput = document.getElementById('edit-todo-item-title');

function saveAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos));
    render();
}

function render() {
    listEl.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onchange = () => toggleComplete(index);

        const span = document.createElement('span');
        span.textContent = todo.title;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Modifier';
        editBtn.onclick = () => openEdit(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.onclick = () => deleteTodo(index);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        listEl.appendChild(li);
    });
}

function addTodo() {
    const title = newTitleInput.value.trim();
    if (title) {
        todos.push({ title: title, completed: false });
        newTitleInput.value = '';
        saveAndRender();
    }
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveAndRender();
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveAndRender();
}

function openEdit(index) {
    editingIndex = index;
    editTitleInput.value = todos[index].title;
    newItemPanel.hidden = true;
    editItemPanel.hidden = false;
}

function confirmEdit() {
    const title = editTitleInput.value.trim();
    if (title && editingIndex > -1) {
        todos[editingIndex].title = title;
        cancelEdit();
        saveAndRender();
    }
}

function cancelEdit() {
    editingIndex = -1;
    editTitleInput.value = '';
    newItemPanel.hidden = false;
    editItemPanel.hidden = true;
}

document.getElementById('new-todo-item-add').onclick = addTodo;
document.getElementById('edit-todo-item-confirm').onclick = confirmEdit;
document.getElementById('edit-todo-item-cancel').onclick = cancelEdit;

render();