var airQualityDiv = document.getElementById('airQuality');
var airInput = document.getElementById('airInput');
var airSubmitBtn = document.getElementById('airSubmit');
let indexBoxes = document.getElementById("indexBoxes");
// Sound Effect by UNIVERSFIELD from Pixabay
let successSound = new Audio("../weather/success.mp3");

airSubmitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var cityName = airInput.value.trim();
    if (cityName.length > 0) {
        getLatLon(cityName);
    } else {
        alert("Please enter a city name.");
    }
    
    //Play Audio
    successSound.play();
});

function getLatLon(cityName) {
    var geocodingAPI = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=4111c10cf035d9d26cbb10831caa0aad';
    fetch(geocodingAPI)
        .then(function(response) {
            return response.json();
        })
        .then(function(latLonData) {
            console.log(latLonData);
            if (geocodingAPI.length == 0) {
                throw new Error("City not found.");
            }
            var lat = latLonData[0].lat;
            var lon = latLonData[0].lon;
            getAirQuality(lat, lon, cityName);
            
        })
        .catch(function(error) {  
            console.error("Error:", error);
            alert("Failed to fetch latitude and longitude. Please try again.");
        });
}

function getAirQuality(lat, lon, cityName) {
    var airQualityAPI = 'https://api.openweathermap.org/data/2.5/air_pollution?lat=' + lat + '&lon=' + lon + '&appid=4111c10cf035d9d26cbb10831caa0aad';
    fetch(airQualityAPI)
        .then(function(response) {
            return response.json();
        })
        .then(function(airQualityData) {
            console.log(airQualityData)
            if (airQualityData.list.length === 0) {
                throw new Error("No air quality data available.");
            }
            
            var list = airQualityData.list;

            airQualityDiv.innerHTML = "";

            var cityHeader = document.createElement('h2');
            cityHeader.innerText = cityName;

            var aqi = document.createElement('h1');
            aqi.innerText = list[0].main.aqi;

            var severity = document.createElement('h3');
            severity.style.fontSize = "30px";
            var description = document.createElement('p');
            description.className = "airDesc";

            var status = ['Good', 'Moderate', 'Unhealthy for Sensitive Groups', 'Unhealthy', 'Very Unhealthy']; 
            var advice = [
                'Air pollution poses little to no risk.',
                'Members of sensitive groups may experience health effects. General groups are less likely to be affected.',
                'Sensitive groups may experience more serious effects. General public may also be affected.',
                'Health Alert: The risk of health effects is greater for all groups.',
                'Health warning of emergency conditions: everyone may experience more serious health effects.'
            ];

            airQualityDiv.appendChild(cityHeader);
            airQualityDiv.appendChild(aqi);

            var aqiValue = Number(aqi.innerText);
            var backgroundColor = "";

            if (aqiValue === 1) {
                severity.textContent = status[0];
                aqi.style.color = "#7FC242"
                description.textContent = advice[0];
                backgroundColor = "#7FC242";
            } else if (aqiValue === 2) {
                severity.textContent = status[1];
                aqi.style.color = "#d6ce51"
                description.textContent = advice[1];
                backgroundColor = "#d6ce51";
            } else if (aqiValue === 3) {
                severity.textContent = status[2];
                aqi.style.color = "#ED8430"
                description.textContent = advice[2];
                backgroundColor = "#ED8430";
            } else if (aqiValue === 4) {
                severity.textContent = status[3];
                aqi.style.color = "#E83425"
                description.textContent = advice[3];
                backgroundColor = "#E83425";
            } else {
                severity.textContent = status[4];
                aqi.style.color = "#854794"
                description.textContent = advice[4];
                backgroundColor = "#854794";
                severity.style.color = "white";
                description.style.color = "white";
            }

            // Create a separate container for background color
            var colorDiv = document.createElement('div');
            colorDiv.style.backgroundColor = backgroundColor;
            colorDiv.style.padding = "10px"; 
            colorDiv.style.borderRadius = "15px";
            colorDiv.style.border = "2px solid snow";

            // Append the severity and description to the colorDiv
            colorDiv.appendChild(severity);
            colorDiv.appendChild(description);

            // Append the colorDiv to the airQualityDiv
            airQualityDiv.appendChild(colorDiv);

            
             //Reveal Index Scale
             indexBoxes.style.display = "block";
        })
        .catch(function(error) {
            console.error("Error:", error);
            alert("An error occurred: " + error.message);
        });
}
