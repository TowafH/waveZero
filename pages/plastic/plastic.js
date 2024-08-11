let map;
let marker;

function initMap() {
    // Default location
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