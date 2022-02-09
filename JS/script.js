//define UI Element

let taskForm = document.querySelector('#task_form')

let taskInput = document.querySelector('#new_tasks');

let taskFilter = document.querySelector('#task_filter');

let taskList = document.querySelector('ul');

let clearBtn = document.querySelector('#clear_btn');


//define event listener

taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearAllTask);
taskFilter.addEventListener('keyup', filterTask); //for filtering in tasklist
document.addEventListener('DOMContentLoaded', getTask); //for keeping inputted task in the page

//define function

function addTask(e){
    if(taskInput.value === ''){//if no value in input box then it will show an alert
        alert('Add a Task');
    } else{
        //Create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + ' ')); 
        taskList.appendChild(li);
        //add link tag a element for showing x sign with the inserted task
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);

        //Local Storage
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = ''; //this is for empty the entry value
    }
    e.preventDefault(); //for any form work should use it to stay the inputted value in the list
}


//Remove Task 
function removeTask(e){
    if(e.target.hasAttribute('href')){ //only target in a tag rather than full ul element
        if(confirm('Are you sure')){ //confirm alert box before removing the tasks
            let ele = e.target.parentElement;
            ele.remove();
            //console.log(e.target)

            //create remove from local store function

            removeFromLS(ele);

        }       
    }   
}


//Clear All Inputted Task List

function clearAllTask(){ 
    //taskList.innerHTML = ''; //remove all task list

    while(taskList.firstChild){ //another way of removing all task list with while loop
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}


//Filter Task

function filterTask(e){
    let text = e.target.value.toLowerCase(); //keep the inputted text in lowercase
    document.querySelectorAll('li').forEach(task => {//take the all value in task arrow function
        let item = task.firstChild.textContent;//take all task list firstchild's textcontent

        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })
}


//Store in Local Storage

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function getTask(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //take below code from addTask function for keeping the data in web page after refresh

    tasks.forEach(task => { //all data are now in task
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + ' ')); 
        taskList.appendChild(li);
        //add link tag a element for showing x sign with the inserted task
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
    })
}


//remove task from local store 

function removeFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild); //that means <a></a> tag is last child of li
    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
