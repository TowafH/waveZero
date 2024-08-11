let map;
let marker;

function initMap() {
    let defaultLocation = {
        lat: 40.712,
        lng: -74.005
    };

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: defaultLocation
    });

    marker = new google.maps.Marker({
        position: defaultLocation,
        map: map
    });
}

let submitBtn = document.getElementById("submitBtn")

function showMicroPlastics() {

fetch("plastics.json")
//Preview the JSON 
.then(function(response){
    console.log(response);
    return response.json();
})
.then(function(myPlasticData){
    //Preview JSON in Console
    console.log(myPlasticData);

})
//Check for Invalid Inputs
.catch(function(error) {
    alert('Failed to fetch weather data. Please try again!');
})
}

submitBtn.addEventListener("click", showMicroPlastics);