"use strict"
// This file has locationsArray, nationalParksArray, parkTypesArray available to it because parks.html has load_national_parks_data.js loaded above this file.

// Radio button with 2 options: By Location, By Park Type
const showListButton = document.querySelector("#showList");
const stateList = document.querySelector("#stateSelection");
const showByLocation = document.querySelector("#showLocations");
const showParksList = document.querySelector("#parkList");

showListButton.addEventListener("click", function(event) {
    locationsArray.forEach(function(state) {
        stateList.innerHTML += `<option value=\"${state}\">${state}</option>`;
        document.querySelector("#byLoc").classList.remove("d-none");
    });
});

showByLocation.addEventListener("click", function(event) {
    // starts by clearing out all <li> elements within the <ul> to produce a clean list
    showParksList.innerHTML = "";

    // creates a variable to store the state chosen in the drop-down
    let chosenState = "";
    chosenState = stateList.value;
    
    // filters the array of all parks based on the chosen state above, then stores the results in a new array
    const filteredParksList = nationalParksArray.filter((park) => {
        return park.State === chosenState;
    })

    // using the filtered array above, creates new <li> elements for each park, using only the names of the parks
    filteredParksList.forEach(function(parks) {
        showParksList.innerHTML += `<li>${parks.LocationName}</li>`;
    });

});
