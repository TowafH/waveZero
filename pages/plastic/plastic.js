// Fetch microplastic information from JSON and display it
function getMicroplasticInfo() {
    fetch('plastics.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        })
        .catch(function() {
            alert("Failed to Fetch Data!")
        });
}

