/**
 * 打开面板
 * @param {string} panelName 面板名
 */
function openPanel(panelName) {
    let panelEl = document.getElementById('mainPanel');
    let currentPanelEl = document.getElementById('panel-' + panelName);
    for(let i = 0; i < panelEl.children.length; i++) {
        panelEl.children[i].classList.remove('active');
    }
    currentPanelEl.classList.add('active');
}
function refreshTheme() {
    if(data.config.radius) {
        document.documentElement.classList.remove('no-radius');
    }
    else {
        document.documentElement.classList.add('no-radius');
    }
    if(data.config.blur) {
        document.documentElement.classList.remove('no-blur');
    }
    else {
        document.documentElement.classList.add('no-blur');
    }
}

function e_load(){
    openPanel('hint');
    loadData();
    refreshTheme();
    refreshTasks();
}
function e_addButton() {
    openPanel('add');
}
function e_addSubmitButton() {
    let subTaskAmount = document.getElementById('subTaskAmount').value;
    let taskName = document.getElementById('taskName').value;
    subTaskAmount = Number(subTaskAmount);
    if(subTaskAmount > 0 && taskName.length > 0) {
        addTask(taskName, subTaskAmount);
        refreshTasks();
        openPanel('hint');
    }
    else {
        alert('名称和子条目数不能为空且子条目数应大于0');
    }
}
function e_editButton() {
    document.getElementById('edit-task-id').innerText = '#' + currentTask;
    document.getElementById('edit-task-name').innerText = data.tasks[currentTask].name;
    document.getElementById('editTaskName').value = data.tasks[currentTask].name;
    openPanel('edit');
}
function e_editSubmitButton() {
    let taskName = document.getElementById('editTaskName').value;
    if(taskName.length > 0) {
        data.tasks[currentTask].name = taskName;
        refreshTasks();
        openPanel('hint');
    }
    else {
        alert('名称不能为空');
    }
}
function e_deleteSubmitButton() {
    if (window.confirm('确认删除？')) {
        data.tasks.splice(currentTask, 1);
        refreshTasks();
        openPanel('hint');
    }
}
function e_settingsButton() {
    document.getElementById('autoSave').checked = getConfig('autoSave', true);
    document.getElementById('radius').checked = getConfig('radius', true);
    document.getElementById('blur').checked = getConfig('blur', true);
    openPanel('settings');
}
function e_settingsSubmitButton() {
    saveSettings();
    refreshTheme();
}
function e_importButton() {
    let imported = document.getElementById('import').value;
    if (imported.length > 0) {
        try {
            data = JSON.parse(imported);
        }
        catch (error) {
            window.alert('出现错误:\n' + error.message);
        }
    }
}
function e_exportButton() {
    document.getElementById('import').value = JSON.stringify(data);
}
function e_deleteAllButton() {
    if (window.confirm('确认删除全部内容？')) {
        data.tasks = [];
        refreshTasks();
    }
}