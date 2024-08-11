//Select Elements
let locationInput = document.getElementById("locationInput");
let submitBtn = document.getElementById("submitBtn");
let successSound = new Audio("success.mp3");

let locationTemp = document.getElementById("locationTemp");
let locationTitle = document.getElementById("locationTitle");
let locationTime = document.getElementById("locationTime")
let weatherDescription = document.getElementById("weatherDesc")

let dayBoxes = document.getElementById("dayBoxes");
let dayHeading = document.getElementById("dayHeading");

let dayLine = document.querySelectorAll("hr")

let indexBoxes = document.getElementById("indexBoxes");

let dayTemp = document.querySelectorAll(".dayTemp");
let dayDate = document.querySelectorAll(".dayDate");
let dayDesc = document.querySelectorAll(".dayDesc");
let dayHumid = document.querySelectorAll(".dayHumid");
let dayDew = document.querySelectorAll(".dayDew");
let dayUV = document.querySelectorAll(".dayUV");

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
        
        //Play Audio
        successSound.play();

        //Display Boxes+Heading+HR
        dayHeading.style.display = "block";
        dayHeading.style.display = "flex";
        dayBoxes.style.display = "block";
        dayBoxes.style.display = "flex";

        indexBoxes.style.display = "block";
        indexBoxes.style.display = "flex";
        
        for (let i = 0; i < dayLine.length; i++){
            dayLine[i].style.display = "block";
        }

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

            // Conditonal Statement to Match up colors with the Dewpoint Index
            if (myWeatherData.days[i].dew > 75){
                dayDew[i].style.color = "#7e212e";
            } else if (myWeatherData.days[i].dew >= 70 && myWeatherData.days[i].dew <= 75){
                dayDew[i].style.color = "#F26B6C";
            } else if (myWeatherData.days[i].dew >= 65 && myWeatherData.days[i].dew <= 69){
                dayDew[i].style.color = "#CAC47C";
            } else if (myWeatherData.days[i].dew >= 60 && myWeatherData.days[i].dew <= 64){
                dayDew[i].style.color = "#F8BCAF";
            } else if (myWeatherData.days[i].dew >= 55 && myWeatherData.days[i].dew <= 60){
                dayDew[i].style.color = "#60D5C3"
            } else if (myWeatherData.days[i].dew < 55){
                dayDew[i].style.color = "#A2BCEC"
            } else {
                dayDew[i].style.color = "white";
            }
        }

        //Select UV Index for the three days
        for (let i = 0; i < restrictDaysView; i++){
            dayUV[i].innerText = "UV Index: " + myWeatherData.days[i].uvindex; 
        }
    })
    //Check for Invalid Inputs
    .catch(function(error) {
        alert('Failed to fetch weather data. Please try again!');
    })
}


submitBtn.addEventListener("click", generateWeather);