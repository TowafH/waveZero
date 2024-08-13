let submitBtn = document.getElementById("submitBtn");
let plasticBoxes = document.getElementById("plasticBoxes");

let restrictDaysView = 3;

let plasticDate = document.querySelectorAll(".plasticDate");
let org = document.querySelectorAll(".org");
let plasticLatLng = document.querySelectorAll(".plasticLatLng");
let ocean = document.querySelectorAll(".ocean");
let author = document.querySelectorAll(".author");
let method = document.querySelectorAll(".method")

// Sound Effect by UNIVERSFIELD from Pixabay
let successSound = new Audio("../weather/success.mp3");


function generateMicroplastics() {
    fetch('plastics.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(plasticLocationData) {
            //View JSON in Console
            console.log(plasticLocationData);
            
            // Display Boxes
            plasticBoxes.style.display = "block";
            plasticBoxes.style.display = "flex";

            //Play Audio
            successSound.play();

            //For Loop to iterate the Date
            for (let i = 0; i < restrictDaysView; i++){
                plasticDate[i].innerText = new Date(plasticLocationData[i].attributes.Date).toLocaleString("en-US", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
            }

            //For Loop to iterate the Lat and Long
            for (let i = 0; i < restrictDaysView; i++){
                plasticLatLng[i].innerText = "Lat, Long: " + Math.floor(plasticLocationData[i].attributes.Latitude) + "°" + " " + Math.floor(plasticLocationData[i].attributes.Longitude) + "°";
            }

            //For loop to iterate the Location
            for (let i = 0; i < restrictDaysView; i++){
                ocean[i].innerText = "Location: " + plasticLocationData[i].attributes.OCEANS;
            }
            
            //For loop to iterate the Author
            for (let i = 0; i < restrictDaysView; i++){
                author[i].innerText = "Results: " + plasticLocationData[i].attributes.DENSTEXT + ", " + plasticLocationData[i].attributes.DENSRANGE + " " + plasticLocationData[i].attributes.UNIT; 
            }

            //For loop to iterate the Sample method
            for (let i = 0; i < restrictDaysView; i++){
                method[i].innerText = "Method: " + plasticLocationData[i].attributes.SAMPMETHOD;
            }
        })
        .catch(function() {
            alert("Failed to Fetch Data!")
        });
}

submitBtn.addEventListener("click", generateMicroplastics)