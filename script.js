const list = document.getElementById('todo-list');
const newPanel = document.getElementById('new-item');
const editPanel = document.getElementById('edit-item');
const addInput = document.getElementById('new-todo-item-title');
const addBtn = document.getElementById('new-todo-item-add');
const editInput = document.getElementById('edit-todo-item-title');
const confirmBtn = document.getElementById('edit-todo-item-confirm');
const cancelBtn = document.getElementById('edit-todo-item-cancel');

let currentItem = null;

addBtn.onclick = function() {
    if (addInput.value === '') return;

    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = addInput.value;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Modifier';

    editBtn.onclick = function() {
        currentItem = span;
        editInput.value = span.textContent;
        newPanel.hidden = true;
        editPanel.hidden = false;
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Supprimer';

    deleteBtn.onclick = function() {
        li.remove();
    };

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    addInput.value = '';
};

confirmBtn.onclick = function() {
    if (editInput.value !== '') {
        currentItem.textContent = editInput.value;
    }
    cancelBtn.onclick();
};

cancelBtn.onclick = function() {
    newPanel.hidden = false;
    editPanel.hidden = true;
    currentItem = null;
    editInput.value = '';
};