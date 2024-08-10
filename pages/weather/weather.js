//Select Elements
let locationInput = document.getElementById("locationInput");
let submitBtn = document.getElementById("submitBtn");

//Functions

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
    //View the returned response.json(); in the Console with this parameter+console.log
    console.log(myWeatherData)
})
.catch(function(error) {
    alert('Failed to fetch weather data. Please try again!');
})

}


submitBtn.addEventListener("click", generateWeather);