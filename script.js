const ui = new UI();

let gorevListesi = [];

if (localStorage.getItem("gorevListesi") !== null) {
    gorevListesi = JSON.parse(localStorage.getItem("gorevListesi"));
}

let editId;
let isEditTask = false;

ui.displayTasks("all");

ui.submitButton.addEventListener("click", newTask);

ui.submitButton.addEventListener("keypress", () => {
    if(event && event.key === "Enter"){
        ui.submitButton.click();
    }
});

for(let span of ui.filters) {
    span.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active")
        span.classList.add("active");
        ui.displayTasks(span.id);
    });
}

function newTask(event) {
    
    if(ui.taskInput && ui.taskInput.value==""){
        alert("görev girmelisiniz");
    }
    else{
        //ekleme
        if(!isEditTask){
            gorevListesi.push({"id" : gorevListesi.length+1, "gorevAdi" : ui.taskInput.value, "durum" : "pending"})
            console.log("edit mode", isEditTask);
        }
        //güncelleme
        else{
            for(let gorev of gorevListesi){
                if(gorev.id == editId){
                    gorev.gorevAdi = ui.taskInput.value;
                    isEditTask = false;
                    editId = null;
                    break
                }
            };
        };
    };

    ui.displayTasks(document.querySelector("span.active").id);
    ui.taskInput.value = "";
    event.preventDefault();
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
    
};

function deleteTask(id) {
    
    let deletedId;
    
    // for(index in gorevListesi){
    //     if(gorevListesi[index].id == id){
    //         deletedId = index;
    //     }
    // }

    // deletedId = gorevListesi.findIndex(function(gorev){
    //     return gorev.id == id
    // })

    deletedId = gorevListesi.findIndex(gorev => gorev.id ==id );

    gorevListesi.splice(deletedId,1);
    ui.displayTasks(document.querySelector("span.active").id);
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
};

function editTask(taskId, taskName){
    editId = taskId;
    isEditTask = true;
    ui.taskInput.value = taskName;
    ui.taskInput.focus();
    ui.taskInput.classList.add("active");
};

ui.btnClear.addEventListener("click", () => {
    gorevListesi.splice(0, gorevListesi.length);
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
    ui.displayTasks("all");
});

function updateStatus(selectedTask){
    
    let label = selectedTask.nextElementSibling;
    let durum;

    if(selectedTask.checked){
        label.classList.add("checked");
        durum = "completed"
    } else {
        label.classList.remove("checked");
        durum = "pending"
    }

    for(let gorev of gorevListesi){
        if(selectedTask.id == gorev.id){
            gorev.durum = durum;
        }
    }

    ui.displayTasks(document.querySelector("span.active").id);
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
};


