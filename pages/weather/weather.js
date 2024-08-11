//Select Elements
let locationInput = document.getElementById("locationInput");
let submitBtn = document.getElementById("submitBtn");

let locationTemp = document.getElementById("locationTemp");
let locationTitle = document.getElementById("locationTitle");
let locationTime = document.getElementById("locationTime")
let weatherDescription = document.getElementById("weatherDesc")

let dayBoxes = document.getElementById("dayBoxes");
let dayHeading = document.getElementById("dayHeading");

let dayLine = document.querySelector("hr")

let dayTemp = document.querySelectorAll(".dayTemp");
let dayDate = document.querySelectorAll(".dayDate");
let dayDesc = document.querySelectorAll(".dayDesc");
let dayHumid = document.querySelectorAll(".dayHumid");
let dayDew = document.querySelectorAll(".dayDew");

//Functions
let restrictDaysView = 3;

function generateWeather(event){

//Prevent Page Refresh
event.preventDefault();

//Include userInput into the input field
let userInputCountry = locationInput.value;
console.log(userInputCountry);

//Fetch Data
fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + userInputCountry + "?unitGroup=us&key=49D2YD468V5AG8DTSDS8DRWZF&contentType=json")
//Preview the JSON 
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(myWeatherData){
        //Preview JSON in Console
        console.log(myWeatherData);

        //Location Temp
        locationTemp.innerText = myWeatherData.currentConditions.temp + " °F";

        //Location Name
        locationTitle.innerText = myWeatherData.resolvedAddress;

        //Location Time
        locationTime.innerText = new Date(myWeatherData.currentConditions.datetimeEpoch * 1000).toLocaleString('en-US', {
            hour: 'numeric',   
            minute: 'numeric', 
            hour12: true       // 12-hour time format
        });

        //Weather Description
        weatherDescription.innerText = myWeatherData.description;
        
        //Display Boxes+Heading+HR
        dayHeading.style.display = "block";
        dayHeading.style.display = "flex";
        dayBoxes.style.display = "block";
        dayBoxes.style.display = "flex";
        dayLine.style.display = "block";

        //Select Date for the three days
        for (let i = 0; i < restrictDaysView; i++){
            dayDate[i].innerText = myWeatherData.days[i].datetime;
        }

        //Select Temps for the three days
        for (let i = 0; i < restrictDaysView; i++){
            dayTemp[i].innerText = myWeatherData.days[i].temp + " °F";
        }

        //Select Conditions for the three days
        for(let i = 0; i < restrictDaysView; i++){
            dayDesc[i].innerText = myWeatherData.days[i].conditions;
        }

        //Select Humid for the three days
        for (let i = 0; i < restrictDaysView; i++){
            dayHumid[i].innerText = "Humidity: " + myWeatherData.days[i].humidity + "%"
        }

        //Select Dew for the three days
        for (let i = 0; i < restrictDaysView; i++){
            dayDew[i].innerText = "Dewpoint: " + myWeatherData.days[i].dew + "°"
        }
    })
    //Check for Invalid Inputs
    .catch(function(error) {
        alert('Failed to fetch weather data. Please try again!');
    })
}


submitBtn.addEventListener("click", generateWeather);