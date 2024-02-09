function UI() {
    this.taskInput = document.getElementById("txtTaskName"),
    this.submitButton = document.getElementById("btnAddNewTask"),
    this.btnClear = document.querySelector("#btnClear"),
    this.filters = document.querySelectorAll(".filters span")
};

UI.prototype.displayTasks = function(filter) {
    let ul = document.getElementById("task-list");
    ul.innerHTML = "";

    if(gorevListesi.length == 0) {

        ul.innerHTML = "<p class='p-3 m-0'>Görev listeniz boş.</p>"

    } else {

        for(let gorev of gorevListesi) {

            let completed = gorev.durum == "completed" ? "checked": "";

            if (filter == gorev.durum || filter == "all"){

                let li = `
                    <li class="task list-group-item">
                        <div class="form-check">
                            <input type="checkbox" onclick="updateStatus(this)" id="${gorev.id}" class="form-check-input" ${completed}>
                            <label for="${gorev.id}" class="form-check-label ${completed}">${gorev.gorevAdi}</label>
                        </div>
                        
                        <div class="dropdown">
                            <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis"></i>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a onclick="deleteTask(${gorev.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash-can"></i> Sil</a></li>
                                <li><a onclick='editTask(${gorev.id}, "${gorev.gorevAdi}")' class="dropdown-item" href="#"><i class="fa-solid fa-pen"></i> Düzenle</a></li>
                            </ul>
                        </div>
                    </li>
                `;
                
                ul.insertAdjacentHTML("beforeend", li);  
            }         
        }
    }
}