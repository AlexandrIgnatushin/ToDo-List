let todoInput = document.querySelector('.todoInput');
let todoBtn = document.querySelector('.addText');
let taskText = document.querySelector('.task__text');
let uncompletedTasks = document.querySelector('.uncompletedTasks');
let completedTasks = document.querySelector('.completedTasks');
let border = document.querySelector('.border');
let theme = document.querySelector('.theme');

let editWindow = document.querySelector('.editWindow');
let save = document.querySelector('.editWindow__save');
let cancel = document.querySelector('.editWindow__cancel');
let editText = document.querySelector('.editWindow__text');
let editBackground = document.querySelector('.editBackground');

let taskArr;

if (localStorage.taskArr) {
    taskArr = JSON.parse(localStorage.getItem('taskArr'));
    createTemplate();
} else {
    taskArr = [];
}

function Task(description) {
    this.description = description;
    this.check = false;
}

todoBtn.addEventListener('click', function () {
    if (todoInput.value.length != 0) {
        taskArr.unshift(new Task(todoInput.value));
        localStorage.setItem('taskArr', JSON.stringify(taskArr));
        createTemplate();
        todoInput.value = '';
    }
})

function template(obj, index) {
    return `
    <div class="task">
        <div class="task__menu">
            <div class="task__menu-check">
                <label class="check">
                    <input type="checkbox" ${obj.check ? 'checked' : ''} onclick = checkbox(${index})>
                    <span></span>
                </label>
            </div>
            <div class="task__menu-btns">
                <button class="task__option"onclick = edit(${index})><i class="fa fa-pencil" aria-hidden="true"></i></button>
                <button class="task__delete" onclick = deleteTask(${index})><i class="fa fa-trash-o" aria-hidden="true"></i></button>
            </div>
        </div>
        <div class="task__text-wrapper">
            <div class="task__text">${obj.description}</div>
        </div>
    </div>`;
}

function createTemplate(item, index) {
    uncompletedTasks.innerHTML = '';
    completedTasks.innerHTML = '';

    for (index = 0; index < taskArr.length; index++) {
        item = taskArr[index];

        if (item.check) {
            completedTasks.innerHTML += template(item, index);
        } else {
            uncompletedTasks.innerHTML += template(item, index);
        }
    }

    borderLine();
}

function checkbox(index) {
    if (taskArr[index].check) {
        taskArr[index].check = false;
    } else {
        taskArr[index].check = true;
    }

    localStorage.setItem('taskArr', JSON.stringify(taskArr));
    createTemplate();
}

function deleteTask(index) {
    taskArr.splice(index, 1);
    localStorage.setItem('taskArr', JSON.stringify(taskArr));
    createTemplate();
}

function borderLine() {

    let isCheck = taskArr.some(
        function (elem) {
            if (elem.check) {
                return true;
            } else {
                return false;
            }
        }
    )

    if (isCheck) {
        border.style.display = 'block';
    } else {
        border.style.display = 'none';
    }
}

function edit(index) {
    editWindow.style.display = 'flex';
    editBackground.style.display = 'block';
    editText.value = taskArr[index].description;
    localStorage.setItem('index', index);
}

save.addEventListener('click', function () {
    let i = localStorage.getItem('index');
    taskArr[i].description = editText.value;
    localStorage.setItem('taskArr', JSON.stringify(taskArr));
    editWindow.style.display = 'none';
    editBackground.style.display = 'none';
    createTemplate();
})

cancel.addEventListener('click', function () {
    editWindow.style.display = 'none';
    editBackground.style.display = 'none';
})

editBackground.addEventListener('click', function() {
    editWindow.style.display = 'none';
    editBackground.style.display = 'none';
})

theme.addEventListener('click', function () {
    localStorage.setItem('theme-mod', 'theme-mod');
    toggleTheme();
})

function toggleTheme() {
    let classTheme = localStorage.getItem('theme-mod');

    if (!document.body.classList.contains('theme-mod')) {
        document.body.classList = classTheme;
    } else {
        document.body.classList.remove('theme-mod');
        localStorage.removeItem('theme-mod');
    }
}

toggleTheme()

