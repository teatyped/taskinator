var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var formEl = document.querySelector("#task-form");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content")


var taskFormHandler = function(event){

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if(!taskNameInput || !taskTypeInput){
        alert("You need to fill out the task form!");
        return false;
    }
    formEl.reset();

    //check form id 
    var isEdit = formEl.hasAttribute("data-task-id");
    if (isEdit){
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    else{
        // No data attribute, so create object data as an object then pass to create taskEl function
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput

        };
        
        // send it as an argument to createTaskEl 
        createTaskEl(taskDataObj);
    }


};


var completeEditTask = function(taskName, taskType, taskId){
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}



var createTaskEl = function(taskDataObj){

    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
// add task id as a custom attribute 
    listItemEl.setAttribute("data-task-id", taskIdCounter);

// create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
// give it a class name
    taskInfoEl.className = "task-info";
// add Html context to div 
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name+ "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
// add entire list item to list 

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);

// increase task counter for next unique id 
    taskIdCounter ++;

};
 var createTaskActions = function(taskId){
// div container that will hold button elements 
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions"
// create edit button 
    var editButtonEl= document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

// create delete button 
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++){
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
 };

var editTask = function(taskId){
    console.log ("editing task #" + taskId);
    // get task list item element 
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");    
    // get content from task name and type 
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    
    // update the from 
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    //
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
    
 }

var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    console.log(taskSelected);
    taskSelected.remove();
}

var taskButtonHandler = function(event){

    
    var targetEl = event.target;
    console.log(event.target); // testing only delete later.

    // when edit button is clicked 
    if (event.target.matches(".edit-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }


    // when delete button is clicked 
    if ( event.target.matches(".delete-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};





pageContentEl.addEventListener("click", taskButtonHandler);



formEl.addEventListener("submit", taskFormHandler);






