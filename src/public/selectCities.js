

const tbody = document.getElementById("tbody");
const select = document.getElementById("cityAdd");
const form = document.getElementById("formAdd");
const btn = document.getElementById("btnAdd");

form.addEventListener("submit", (e) => { e.preventDefault(); })
btn.addEventListener("click", addCity);


function RetrieveData() {
    fetch("http://localhost:3000/city")
        .then(res => res.json())
        .then(treatment2)
        .catch(console.log);
}

function treatment2(data) {
    select.innerHTML = "";
    data.features.forEach(element => {
        let option = document.createElement("option");
        option.innerText = element.properties.nombre;
        option.value = element.properties.id;
        select.appendChild(option);
    });
}

function treatment(data) {
    tbody.innerHTML = "";
    data.features.forEach(element => {
        tbody.appendChild(createLine(element));
    });
}


function createLine(element) {
    const tr = document.createElement("tr");


    let td = document.createElement("td");
    td.innerText = element.properties.nombre;
    tr.appendChild(td);
    let td2 = document.createElement("td");
    td2.innerText = element.geometry.coordinates[0][0];
    tr.appendChild(td2);
    let td3 = document.createElement("td");
    td3.innerText = element.geometry.coordinates[0][1];
    tr.appendChild(td3);
    let button = document.createElement("button");
    button.innerText = "Delete";
    button.classList="btn btn-danger";
    button.value = element.properties.id;
    button.addEventListener("click", deleteCity);
    tr.appendChild(button);

    return tr;
}

function RefreshTable(){
    fetch("http://localhost:3000/city/selected")
    .then(res => res.json())
    .then(treatment)
    .catch(console.log);
}



function addCity() {
    let idCity = select.value;
    

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/city");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
        RetrieveData();
        RefreshTable();
    }
    xhr.send(JSON.stringify({
        id : idCity
    }));

   
}

function deleteCity(event){
    
    let idCity = event.srcElement.value;
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:3000/city");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function(){
        RetrieveData();
        RefreshTable();
    }
    xhr.send(JSON.stringify({
        id : idCity
    }));


}

window.onload = ()=> {
    RetrieveData();
    RefreshTable();
}
