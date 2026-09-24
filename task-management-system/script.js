// Get tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks when page loads
displayTasks();


// ADD TASK
function addTask() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let dueDate = document.getElementById("dueDate").value;
    let priority = document.getElementById("priority").value;

    // Validation
    if (title == "") {
        alert("Please enter task title");
        return;
    }

    if (dueDate == "") {
        alert("Please select due date");
        return;
    }

    // Create new task
    let task = {
        id: Date.now(),
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority
    };

    tasks.push(task);

    saveTasks();
    displayTasks();
    clearForm();

    alert("Task added successfully");
}


// DISPLAY TASKS
function displayTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let searchText = document.getElementById("search").value.toLowerCase();
    let filterPriority = document.getElementById("filterPriority").value;

    let filteredTasks = tasks.filter(function(task) {
        let matchSearch =
            task.title.toLowerCase().includes(searchText) ||
            task.description.toLowerCase().includes(searchText);

        let matchPriority =
            filterPriority == "all" ||
            task.priority == filterPriority;

        return matchSearch && matchPriority;
    });

    if (filteredTasks.length == 0) {
        taskList.innerHTML = '<div class="no-task">No tasks found</div>';
        return;
    }

    filteredTasks.forEach(function(task) {
        let taskCard = document.createElement("div");
        taskCard.className = "task-card";

        taskCard.innerHTML = `
            <h3>${task.title}</h3>

            <p>
                <strong>Description:</strong>
                ${task.description || "No description"}
            </p>

            <p>
                <strong>Due Date:</strong>
                ${task.dueDate}
            </p>

            <p>
                <strong>Priority:</strong>
                <span class="priority ${task.priority}">
                    ${task.priority.toUpperCase()}
                </span>
            </p>

            <button class="edit-btn" onclick="editTask(${task.id})">
                Edit
            </button>

            <button class="delete-btn" onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

        taskList.appendChild(taskCard);
    });
}


// EDIT TASK
function editTask(id) {
    let task = tasks.find(function(task) {
        return task.id == id;
    });

    if (!task) {
        return;
    }

    document.getElementById("taskId").value = task.id;
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("dueDate").value = task.dueDate;
    document.getElementById("priority").value = task.priority;

    document.getElementById("addBtn").style.display = "none";
    document.getElementById("updateBtn").style.display = "inline-block";
    document.getElementById("cancelBtn").style.display = "inline-block";
    document.getElementById("formTitle").innerText = "Edit Task";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// UPDATE TASK
function updateTask() {
    let id = document.getElementById("taskId").value;
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let dueDate = document.getElementById("dueDate").value;
    let priority = document.getElementById("priority").value;

    if (title == "") {
        alert("Please enter task title");
        return;
    }

    if (dueDate == "") {
        alert("Please select due date");
        return;
    }

    let task = tasks.find(function(task) {
        return task.id == id;
    });

    if (task) {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
    }

    saveTasks();
    displayTasks();
    clearForm();

    document.getElementById("addBtn").style.display = "inline-block";
    document.getElementById("updateBtn").style.display = "none";
    document.getElementById("cancelBtn").style.display = "none";
    document.getElementById("formTitle").innerText = "Add New Task";

    alert("Task updated successfully");
}


// DELETE TASK
function deleteTask(id) {
    let confirmDelete = confirm("Are you sure you want to delete this task?");

    if (confirmDelete == true) {
        tasks = tasks.filter(function(task) {
            return task.id != id;
        });

        saveTasks();
        displayTasks();
    }
}


// SAVE TASKS
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// CLEAR FORM
function clearForm() {
    document.getElementById("taskId").value = "";
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("priority").value = "medium";
}


// CANCEL EDIT
function cancelEdit() {
    clearForm();

    document.getElementById("addBtn").style.display = "inline-block";
    document.getElementById("updateBtn").style.display = "none";
    document.getElementById("cancelBtn").style.display = "none";
    document.getElementById("formTitle").innerText = "Add New Task";
}
