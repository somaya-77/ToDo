showtasks()
let addtaskinput = document.getElementById("addtaskinput")
let addtaskbtn = document.getElementById("addtaskbtn")



addtaskbtn.addEventListener("click", function() {
    addtaskinputValue = addtaskinput.value
    if(addtaskinputValue != ''){
        let webTask = localStorage.getItem("localtask");
        // check data
        if(webTask == null){
            taskObj = []
        }else{
            taskObj = JSON.parse(webTask)
        }

        taskObj.push({'taskName': addtaskinputValue, 'completed': false})
        
        localStorage.setItem("localtask", JSON.stringify(taskObj))
        addtaskinput.value = '';
    }
    showtasks()
})


// function show data
function showtasks(){
    let webTask = localStorage.getItem("localtask")
    // check data
    if(webTask == null){
        taskObj = []
    }else{
        taskObj = JSON.parse(webTask)
    }
    let html = '';
    let addedtasklist = document.getElementById("addedtasklist")

    taskObj.forEach((item, index) => {
        // check completed
        if(item.completed == true){
            taskCompleteValue = `<p class="completed">${item.taskName}</p>`;
        }else{
            taskCompleteValue = `<p>${item.taskName}</p>`;
        }

        html += `<div class="task">
                    <span>${index +1}</span>
                    ${taskCompleteValue}
                    <div>
                        <button class="edit" onclick="edittask(${index})"><i class="fa fa-edit"></i>Edit</button>

                        <button class="del" onclick="deleteitem(${index})"><i class="fa fa-trash"></i>Delete</button>
                    </div>
                </div>`
    })
    addedtasklist.innerHTML = html
}

// edittask function

function edittask(indexVal) {

    let saveindex = document.getElementById("saveindex"); 
    let addtaskbtn = document.getElementById("addtaskbtn");
    let savetaskbtn = document.getElementById("savetaskbtn");
    
    saveindex.value = indexVal;
    let webTask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webTask)

    addtaskinput.value = taskObj[indexVal]['taskName'];

    addtaskbtn.style.display="none";
    savetaskbtn.style.display="block";
}

// save task
document.getElementById("savetaskbtn").addEventListener("click", function() {
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webTask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webTask); 
    let saveindex = document.getElementById("saveindex").value;

    for (keys in taskObj[saveindex]){
        // check name
        if(keys == 'taskName'){
            taskObj[saveindex].taskName = addtaskinput.value;
        }
    }

    addtaskbtn.style.display="block";
    savetaskbtn.style.display="none";
    localStorage.setItem("localtask", JSON.stringify(taskObj))
    addtaskinput.value = '';
    showtasks()
})



// deleteitem
function deleteitem(indexVal){
    let webTask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webTask); 
    taskObj.splice(indexVal, 1)
    localStorage.setItem("localtask", JSON.stringify(taskObj))
    showtasks()
}


// deleteall
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function(){
    let savetaskbtn = document.getElementById("savetaskbtn");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webTask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webTask);
    if(webTask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webTask);
        taskObj = [];
    }
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtasks()

})


