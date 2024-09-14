'use strict';

var data = {
    tasks: [
        {
            name: '测试',
            sub: [
                {
                    status: 0,
                },
            ],
        },
    ],
    config: {
        autoSave: true,
        radius: true,
    }
};
var currentTask = 0;
const STATUS_MAX = 1;

/**
 * 载入Task
 * @param {number} id
 * @param {boolean} save 是否保存
 */
function loadTask(id, save = true){
    currentTask = id;
    document.getElementById('details-task-id').innerText = '#' + id;
    document.getElementById('details-task-name').innerText = data.tasks[id].name;
    let subsEl = document.getElementById('details-sub');
    let task = data.tasks[id];
    let DOM = '';
    for (let i = 0; i < task.sub.length; i++) {
        let sub = task.sub[i];
        DOM += `
<div class="task-sub status-${sub.status}" id="sub-${i}"
    title="子项${i + 1} (#${i})\n状态: ${sub.status}"
    onclick="toggleSub(${id}, ${i})">
    ${i + 1}
</div>
        `
    }
    subsEl.innerHTML = DOM;
    openPanel('details');
    refreshTasks();
    if (save) {
        saveData();
    }
}
/**
 * 刷新Tasks
 * @param {boolean} save 是否保存
 */
function refreshTasks(save = true){
    let taskListEl = document.getElementById('tasks');
    let DOM = '';
    for (let i = 0; i < data.tasks.length; i++) {
        let task = data.tasks[i];
        DOM += `
<li class="task${i == currentTask ? ' active': ''}" id="task-${i}" 
    title="#${i}\n${task.name}\n${task.sub.length} 个子项" 
    onclick="loadTask(${i})">
    ${task.name}
</li>`;
    }
    taskListEl.innerHTML = DOM;
    if (save) {
        saveData();
    }
}
/**
 * 切换子项
 * @param {number} taskId
 * @param {number} subId
 */
function toggleSub(taskId, subId) {
    let sub = data.tasks[taskId].sub[subId];
    sub.status = sub.status + 1;
    if (sub.status > STATUS_MAX) {
        sub.status = 0;
    };
    loadTask(currentTask);
    refreshTasks();
}
/**
 * 添加Task
 * @param {string} taskName
 * @param {number} subTaskAmount
 */
function addTask(taskName, subTaskAmount) {
    let task = {
        name: taskName,
        sub: [],
    };
    for(let i = 0; i < subTaskAmount; i++) {
        task.sub.push({
            status: 0,
        });
    }
    data.tasks.push(task);
}
/**
 * 保存数据
 */
function saveData() {
    if (autoSave) {
        try {
            localStorage.setItem('completeStatistics', JSON.stringify(data));
        } catch (error) {
            alert('保存时出现错误:\n' + error.message);
        }
    }
}
/**
 * 读取数据
 */
function loadData() {
    try {
        let parsed = JSON.parse(localStorage.getItem('completeStatistics'));
        if (parsed !== null) {
            data = parsed;
        }
    } catch (error) {
        alert('读取时出现错误:\n' + error.message);
    }
    initConfig('autoSave', true);
    initConfig('radius', true);
    initConfig('blur', true);
}

function saveSettings(){
    setConfig('autoSave', document.getElementById('autoSave').checked);
    setConfig('radius', document.getElementById('radius').checked);
    setConfig('blur', document.getElementById('blur').checked);
    saveData();
}
function setConfig(name, value) {
    if (!data.config) {
        data.config = {};
    }
    data.config[name] = value;
}
function getConfig(name, defaultValue) {
    if(data.config && data?.config[name]) {
        return data.config[name];
    }
    else {
        return defaultValue;
    }
}
function initConfig(name, defaultValue) {
    if(data.config && data.config[name]) {
        setConfig(name, defaultValue);
    }
}