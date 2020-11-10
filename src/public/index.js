// Initialize and add the map
function initMap() {
    // The location of Uluru
    const mdp = { lat: -37.997611, lng: -57.548162 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: mdp,
    });
    // The marker, positioned at Uluru
    let  marker = new google.maps.Marker({
      position: mdp,
      map: map,
    });


    fetch("http://localhost:3000/city/selected")
    .then(res => res.json())
    .then(treatment)
    .catch(console.log);

    


    function treatment(data){
        console.log(data);
        const road = [{ lat: -37.997611, lng: -57.548162 }];
        data.features.forEach(element => {
            let city = {lat : +element.properties.lat_gd, lng: +element.properties.long_gd };
            road.push(city);
            let  marker = new google.maps.Marker({
                position: city,
                map: map,
              });
            
        });

        road.push({ lat: -37.997611, lng: -57.548162 });

        console.log(road);

        const line = new google.maps.Polyline({
          path:road,
          geodesic: true,
          strokeColor: "#000000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });
    
        line.setMap(map);
    }

    


}

