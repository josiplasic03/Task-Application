const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addTaskButton = document.getElementById('addTaskButton');

let addedTasks = [];

// Funkcija za dodavanje zadatka
const addTask = () => {
    if (taskInput.value.trim() !== '') {
        if (addedTasks.includes(taskInput.value)) {
            alert('Već ste dodali ovaj zadatak.');
        } else if (addedTasks.length >= 5) {
            alert('Dostigli ste maksimalan broj zadataka (5).');
        } else {
            const li = document.createElement('li');
            li.textContent = taskInput.value;

            const deleteTaskButton = document.createElement('button');
            deleteTaskButton.textContent = 'Delete';
            li.appendChild(deleteTaskButton);

            deleteTaskButton.addEventListener('click', () => {
                deleteTask(li);
            });

            taskList.appendChild(li);
            addedTasks.push(taskInput.value);
            updateStorage();

            taskInput.value = ''; 
        }
    }
};

// Funkcija za brisanje zadatka
const deleteTask = (task) => {
    const taskIndex = addedTasks.indexOf(task.textContent);
    addedTasks.splice(taskIndex, 1);
    task.remove();
    updateStorage();
};

// Funkcija za ažuriranje lokalne pohrane
const updateStorage = () => {
    localStorage.setItem('addedTasks', JSON.stringify(addedTasks));
};

// Funkcija za učitavanje podataka iz lokalne pohrane prilikom pokretanja aplikacije
const loadFromStorage = () => {
    const storedTasks = localStorage.getItem('addedTasks');
    if (storedTasks) {
        addedTasks = JSON.parse(storedTasks);
        addedTasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;

            const deleteTaskButton = document.createElement('button');
            deleteTaskButton.textContent = 'Delete';
            li.appendChild(deleteTaskButton);

            deleteTaskButton.addEventListener('click', () => {
                deleteTask(li);
            });

            taskList.appendChild(li);
        });
    }
};

// Dodajemo event listener za dodavanje zadatka na button
addTaskButton.addEventListener('click', addTask);

// Poziv funkcije za učitavanje podataka iz lokalne pohrane prilikom pokretanja aplikacije
loadFromStorage();