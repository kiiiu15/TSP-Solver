// Initialize and add the map
function initMap() {

    const p = document.getElementById("distance");
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
    .then(treatment2)
    .catch(console.log);

    function treatment2(data){

     
      const arr = [];
      data.features.forEach(element => {
        arr.push(element.properties.nombre+",BA");
        
      });
      //console.log(arr);
      
      let origin = arr[0];
      arr.splice(0,1);
      let destination = arr[arr.length-1];
      arr.splice(arr.length-1,1);
      let wayPoints = "optimize:true|via:"+arr.join("|via:");
      //console.log(wayPoints);

      const a = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${wayPoints}&key=AIzaSyC9pX2PswFshL-jkkPA6imOLMZYl8K28cY`

     //console.log(a);
      const xhr = new XMLHttpRequest();
      xhr.open("GET", a);
      xhr.responseType ="json";
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr.onload = function () {
          //console.log(xhr.response.routes[0].legs);

          p.innerHTML = xhr.response.routes[0].legs[0].distance.text
          //console.log(xhr.response.routes[0])
          const road = [];
          xhr.response.routes[0].legs[0].steps.forEach(step => {

              road.push(step.end_location);
          });


          xhr.response.routes[0].legs[0].via_waypoint.forEach(location => {
            let position = location.location;
            let  marker = new google.maps.Marker({
              position: position,
              map: map,
            });

          
    
        });

        const line = new google.maps.Polyline({
          path: road,
          geodesic: true,
          strokeColor: "#000000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });
    
        line.setMap(map);


          
            

          





      }
      xhr.send();
    }


    function treatment(data){

      treatment2(data);
        
        const road = [];

        p.innerText = data.distance;

        data.features.forEach(element => {
            let city = {lat : +element.properties.lat_gd, lng: +element.properties.long_gd };
            road.push(city);
            let  marker = new google.maps.Marker({
                position: city,
                map: map,
              });
            
        });

        

        

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

