fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/United%20States?unitGroup=us&key=49D2YD468V5AG8DTSDS8DRWZF&contentType=json")
 //Preview the JSON 
.then(function(response){
    console.log(response);
    return response.json();
})
.then(function(myWeatherData){
    //View the returned response.json(); in the Console with this parameter+console.log
    console.log(myWeatherData)
})