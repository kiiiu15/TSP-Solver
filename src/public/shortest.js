
function initMap() {

    const p = document.getElementById("distance");
    //const fromSelect = document.getElementById("from");
    const toSelect = document.getElementById("to");
    const btnSearch = document.getElementById("btnSearch");


    // The location of MDP
    const mdp = { lat: -37.997611, lng: -57.548162 };
    // The map, centered at MDP
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: mdp,
    });
    // The marker, positioned at Uluru
    let marker = new google.maps.Marker({
        position: mdp,
        map: map,
    });

    directionsService = new google.maps.DirectionsService

    directionsDisplay = new google.maps.DirectionsRenderer({
            map: map
        });



    

    btnSearch.addEventListener("click", calculateAndShowPath)
    RetrieveData();

    function RetrieveData() {
        fetch("http://localhost:3000/city")
            .then(res => res.json())
            .then(treatment)
            .catch(console.log);
    }

 


    //fromSelect.addEventListener("change", resetToSelect)


    function calculateAndShowPath() {
        
        
        let destiantion = toSelect.value + ",BA";
        
       
        //console.log(destination);

        
        directionsService.route({
            origin: "Mar del Plata, BA",
            destination: destiantion,
            travelMode: google.maps.TravelMode.DRIVING
        }, (result, status) => {
            
            if (status == "OK"){
                p.innerHTML = result.routes[0].legs[0].distance.text;
                directionsDisplay.setDirections(result);
            }else{
                alert("There was error retrieving data");
            }
        });
        

    }


    function treatment(data) {

        //createOptions(fromSelect, data.features);
        createOptions(toSelect, data.features.filter((city, index) => city.properties.nombre != "Mar del Plata"));


    }

    /*
    function resetToSelect(event){
        
        const selected = event.srcElement.value;
        
    }*/



    function createOptions(select, cities) {
        select.innerHTML = "";

        cities.forEach(element => {
            let option = document.createElement("option");
            option.innerText = element.properties.nombre;
            option.value =element.properties.nombre;

            select.appendChild(option);
        });
    }
}







