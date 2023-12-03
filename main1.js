/*
  -- review the differance between append and append child 
*/

// setting up variables
let theInput = document.querySelector(".add-task input"),
    theAddButton = document.querySelector(".add-task .plus"),
    tasksContainer = document.querySelector(".tasks-content"),
    tasksCount = document.querySelector(".tasks-count span"),
    tasksCompleted = document.querySelector(".tasks-completed span");

// Create Delete For All Tasks Button => To Delete All Tasks Together At The Same Time
let taskStateDiv = document.querySelector(".task-stats");
let all = document.createElement("div");
let deleteAll = document.createElement("div");
let deleteAllText = document.createTextNode("Delete All");
let iconDel = document.createElement("i");
iconDel.className = "fa-solid fa-trash";
iconDel.style.marginLeft= "10px";
deleteAll.appendChild(deleteAllText);
deleteAll.appendChild(iconDel);

deleteAll.className = "delAll";
all.className = "all";
all.style.fontSize = "16px";
all.style.marginTop = "50px";
all.appendChild(deleteAll);

// Create Finish For All Tasks Button => To Finish All Taks Together At The Same Time
let finishAll = document.createElement("div");
let finishAllText = document.createTextNode("Finish All");
let iconFinish = document.createElement("i");
iconFinish.className = "fa-solid fa-square-check";
iconFinish.style.marginLeft= "10px";
finishAll.appendChild(finishAllText);
finishAll.appendChild(iconFinish);

finishAll.className = "finishAll";
all.appendChild(finishAll);
taskStateDiv.appendChild(all);
// finishAll.style.float = "right";
// finishAll.style.backgroundColor = "#eee";
// finishAll.style.color = "black";

// Load tasks from localStorage
let existingTasks = window.localStorage.getItem("tasks") || '';
let tasks = existingTasks ? existingTasks.split('\n') : [];
let arr = [];

// focus on input field once the window loads (page loads)
window.onload = function(){
    theInput.focus();
    displayTasksFromLocalStorage();
};

// Function to display tasks from localStorage
function displayTasksFromLocalStorage() {
    // Clear existing tasks
    while (tasksContainer.firstChild) {
        tasksContainer.removeChild(tasksContainer.firstChild);
    }

    if(tasks.length > 0){
        // Display tasks from localStorage
        tasks.forEach(task => {
            // Create Span Element
            let mainSpan = document.createElement("span");
            // Create Delete Button
            let deleteElement = document.createElement("span");
            // Create Finish Button
            let finishElement = document.createElement("span");

            // Create The Span (Main Span) Text
            let spanText = document.createTextNode(task);
            // Create The Delete Button Text
            let deleteText = document.createTextNode("Delete");
            // Create The Finish Button Text
            let finishText = document.createTextNode("Finish");

            // Create The Delete Icon (as font-awesome)
            let iconDel = document.createElement("i");
            // Create The Finish Icon (as font-awesome)
            let iconFinish = document.createElement("i");

            iconDel.className = "fa-solid fa-trash";
            iconFinish.className = "fa-solid fa-square-check";

            iconDel.style.marginLeft = "5px";
            iconFinish.style.marginLeft = "5px";

            // Add Text To Main Span
            mainSpan.appendChild(spanText);
            // Add Class To Main Span
            mainSpan.className = 'task-box';

            // Add Text To Delete Button
            deleteElement.appendChild(deleteText);
            // Add Class to Delete Button
            deleteElement.className = 'delete';

            finishElement.appendChild(finishText);
            finishElement.className = 'finish';

            deleteElement.appendChild(iconDel);
            finishElement.appendChild(iconFinish);

            // Add Delete Button To Main Span
            mainSpan.appendChild(deleteElement);
            // Add Finish Button To Main Span
            mainSpan.appendChild(finishElement);

            // Add The Task To The Container
            tasksContainer.appendChild(mainSpan);

            finishElement.style.marginRight = "15px";

            // Calculate Tasks
            calcTasks();
        }
        );
    }
    else{
        createNoTasks();
    }
}

theAddButton.onclick = function(){
    if (theInput.value === ''){
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: "Input field cannot be empty!"
        });
        theInput.value = "";
        theInput.focus();
    }
    else{
        // Check if the task already exists in the tasks array
        if(tasks.includes(theInput.value)){
            Swal.fire({
                icon: "error",
                title: "Sorry..",
                text: "The Task Already Exists!"
            });
            theInput.value = "";
            theInput.focus();
        }
        else{
            // Add the task to the tasks array
            tasks.push(theInput.value);

            let noTasksMsg = document.querySelector(".no-tasks-msg");
            if (document.body.contains(document.querySelector(".no-tasks-msg"))){
                noTasksMsg.remove();
            }

        // DOM
        // Create Span Element
        let mainSpan = document.createElement("span");
        // Create Delete Button
        let deleteElement = document.createElement("span");
        // Create Finish Button
        let finishElement = document.createElement("span");
        
        // Create The Span (Main Span) Text
        let spanText = document.createTextNode(theInput.value);
        // Create The Delete Button Text
        let deleteText = document.createTextNode("Delete");
        // Create The Finish Button Text
        let finishText = document.createTextNode("Finish");

        // Create The Delete Icon (as font-awesome)
        let iconDel = document.createElement("i");
        // Create The Finish Icon (as font-awesome)
        let iconFinish = document.createElement("i");

        iconDel.className = "fa-solid fa-trash";
        iconFinish.className = "fa-solid fa-square-check";

        iconDel.style.marginLeft = "5px";
        iconFinish.style.marginLeft = "5px";

        // Add Text To Main Span
        mainSpan.appendChild(spanText);
        // Add Class To Main Span
        mainSpan.className = 'task-box';

        // Add Text To Delete Button
        deleteElement.appendChild(deleteText);
        // Add Class to Delete Button
        deleteElement.className = 'delete';

        finishElement.appendChild(finishText);
        finishElement.className = 'finish';

        deleteElement.appendChild(iconDel);
        finishElement.appendChild(iconFinish);

        // Add Delete Button To Main Span
        mainSpan.appendChild(deleteElement);
        // Add Finish Button To Main Span
        mainSpan.appendChild(finishElement);

        // Add The Task To The Container
        tasksContainer.appendChild(mainSpan);

        finishElement.style.marginRight = "15px";


        // ------------------------------- add to localStorage
        window.localStorage.setItem("tasks", tasks.join('\n'));
        }
        // Empty The Input After Writing Inside It 
        theInput.value = '';
        // Focus On The Input Field After Being Empty 
        theInput.focus();
        // Calculate Tasks
        calcTasks();
    }
};

// Delete and Finish
document.addEventListener("click" ,  function(e){
    // delete a task
    if (e.target.className == 'delete'){
        // e.target => <span class="delete">Delete</span>
        // e.target.parentNode => <!-- <span class="task-box">Task One<span class="delete">Delete</span></span>
        e.target.parentNode.remove();

        // Remove the task from localStorage , also
        let index = tasks.indexOf(e.target.parentNode.firstChild.textContent); // Find the index of the task to remove
        if (index !== -1) {
            tasks.splice(index, 1); // Remove the task from the array , 1 = > to remove only one item
            if (tasks.length > 0) {
                // If there are remaining tasks, update localStorage
                window.localStorage.setItem("tasks", tasks.join('\n')); // Split tasks into an array
            } else {
                // If there are no remaining tasks, clear localStorage
                window.localStorage.clear();
                // Clear tasks array as well
                tasks = [];
                // Clear arr array
                arr = [];
            }
        }

        // Check Number Of Tasks Inside The Container
        // if you delete all tasks
        if (tasksContainer.childElementCount === 0){
            createNoTasks();
        }
    }
    // delete all tasks
    if(e.target.className === "delAll"){
        while(tasksContainer.firstChild){
            // Remove all child elements from tasksContainer
            tasksContainer.removeChild(tasksContainer.firstChild);
        }

        // Clear tasks from localStorage
        window.localStorage.clear();
        // Clear tasks array
        tasks = [];
        // Clear arr array
        arr = [];

        if(tasksContainer.childElementCount === 0){
            createNoTasks();
        }

        Swal.fire({
            icon: "success",
            text: "All Tasks Have Been Deleted Successfully!"
        });
        // theInput.value = "";
        // theInput.focus();
    }
    // finish a task
    // if (e.target.classList.contains("task-box")){
    if (e.target.classList.contains("finish") || e.target.classList.contains("task-box")) {
        e.target.parentElement.classList.toggle("finished");
    }
    // finish all tasks
    if (e.target.className === "finishAll"){
        for(let i = 0 ; i < tasksContainer.children.length ; i++){
            tasksContainer.children[i].classList.toggle("finished");
        }

        let allFinished = true;

        for (let i = 0; i < tasksContainer.children.length; i++) {
            if (!tasksContainer.children[i].classList.contains("finished")) {
                allFinished = false;
                break;  // No need to check further if one task is not finished
            }
        }

        if (allFinished) {
            Swal.fire({
            icon: "success",
            text: "All Tasks Have Been Finished Successfully!"
        });
        // theInput = '';
        // theInput.focus();
        } 
        else {
            Swal.fire({
            icon: "info",
            text: "Not All Tasks Have Been Finished!"
        });
        // theInput = '';
        // theInput.focus();
        }

        
    }

    // Clear the arr array when adding a task
    arr = [];

    calcTasks();
});

// DOM
// Function To Create No Tasks Msg
function createNoTasks(){
    // Create Msg Span Element
    let msgSpan = document.createElement("span");
    // Create The Text Msg Span
    let msgText = document.createTextNode("No Tasks To Show");
    // Add Text To Msg Span Element
    msgSpan.appendChild(msgText);
    // Add Class To Msg Span
    msgSpan.className = "no-tasks-msg";
    // Append The Msg Span Element To The Task Container
    tasksContainer.appendChild(msgSpan);
}

// Function To Calculate Tasks
function calcTasks(){
    // Calculate All Tasks
    tasksCount.innerHTML = document.querySelectorAll(".tasks-content .task-box").length;
    // Calculate Completed Tasks
    tasksCompleted.innerHTML = document.querySelectorAll(".tasks-content .finished").length;
}
