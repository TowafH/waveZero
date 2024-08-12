
    var airQualityDiv = document.getElementById('airQuality');
    var airInput = document.getElementById('airInput');
    var airSubmitBtn = document.getElementById('airSubmit');
    var goodDiv = document.getElementById("good");
    var fairDiv = document.getElementById("fair");
    var moderateDiv = document.getElementById("moderate");
    var poorDiv = document.getElementById("poor");
    var veryPoorDiv = document.getElementById("very_poor");

    airSubmitBtn.addEventListener("click", function(event) {
        event.preventDefault();
        var cityName = airInput.value.trim();
        if (cityName) {
            getLatLon(cityName);
        } else {
            alert("Please enter a city name.");
        }
    });

    function getLatLon(cityName) {
        var latLonAPI = 'https://api.openweathermap.org/geo/1.0/direct?q=' + encodeURIComponent(cityName) + '&limit=1&appid=8e61a85e3b57bba628d9d4ef2f4c94c7';
        fetch(latLonAPI)
            .then(function(response) {
                return response.json();
            })
            .then(function(latLonData) {
                console.log(latLonData);
                if (latLonData.length === 0) {
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
        var airQualityAPI = 'https://api.openweathermap.org/data/2.5/air_pollution?lat=' + lat + '&lon=' + lon + '&appid=8e61a85e3b57bba628d9d4ef2f4c94c7';
        fetch(airQualityAPI)
            .then(function(response) {
                return response.json();
            })
            .then(function(airQualityData) {
                if (!airQualityData.list || airQualityData.list.length === 0) {
                    throw new Error("No air quality data available.");
                }
                var list = airQualityData.list;

                airQualityDiv.innerHTML = "";

                var cityHeader = document.createElement('h3');
                cityHeader.innerText = cityName;

                var aqi = document.createElement('h1');
                aqi.innerText = list[0].main.aqi;

                var severity = document.createElement('h3');
                severity.style.fontSize = "30px";
                var description = document.createElement('p');
                description.className = "airDesc";

                var status = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
                var advice = [
                    'Air pollution poses little to no risk.',
                    'Air pollution may cause risks to sensitive groups.',
                    'Members of sensitive groups may experience health effects. General groups are less likely to be affected.',
                    'Members of general groups may experience health effects. Sensitive groups may experience more serious effects.',
                    'Health Alert: The risk of health effects is greater for all groups.'
                ];

                airQualityDiv.appendChild(cityHeader);
                airQualityDiv.appendChild(aqi);

                var aqiValue = Number(aqi.innerText);
                var backgroundColor = "";
                var highlightedDiv = null;

                if (aqiValue === 1) {
                    severity.textContent = status[0];
                    description.textContent = advice[0];
                    backgroundColor = "lightgreen";
                    highlightedDiv = goodDiv;
                } else if (aqiValue === 2) {
                    severity.textContent = status[1];
                    description.textContent = advice[1];
                    backgroundColor = "yellow";
                    highlightedDiv = fairDiv;
                } else if (aqiValue === 3) {
                    severity.textContent = status[2];
                    description.textContent = advice[2];
                    backgroundColor = "orange";
                    highlightedDiv = moderateDiv;
                } else if (aqiValue === 4) {
                    severity.textContent = status[3];
                    description.textContent = advice[3];
                    backgroundColor = "red";
                    highlightedDiv = poorDiv;
                } else {
                    severity.textContent = status[4];
                    description.textContent = advice[4];
                    backgroundColor = "purple";
                    airQualityDiv.style.color = "white";
                    highlightedDiv = veryPoorDiv;
                }

                airQualityDiv.style.backgroundColor = backgroundColor;
                if (highlightedDiv) {
                    highlightedDiv.style.border = "7px solid green";
                }

                airQualityDiv.appendChild(severity);
                airQualityDiv.appendChild(description);
            })
            .catch(function(error) {
                console.error("Error:", error);
                alert("An error occurred: " + error.message);
            });
    }