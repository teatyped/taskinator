var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(){
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
}
// summery oh above Create a new task item.//Style the new task item.//Add the text.// Append this element to the task list.

buttonEl.addEventListener("click", createTaskHandler);






