function initMap() {
    let location = {
        lat: 40.712,
        lng: -74.005
    };

    let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: location
    });
    let marker = new google.maps.Marker({
        position: location,
        map: map
    });
}
