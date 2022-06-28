"use strict"
// This file has locationsArray, nationalParksArray, parkTypesArray available to it because parks.html has load_national_parks_data.js loaded above this file.

const searchMethod = document.querySelector("#searchMethod");
const listStates = document.querySelector("#stateSelection");
const showTheParks = document.querySelector("#showParks");
const showParksList = document.querySelector("#parkList");
const listTypes = document.querySelector("#typeSelection");

// Drop-down populates if Location is selected as the search method
searchMethod.onchange = (event) => {
    showParksList.innerHTML = "";
    // Search by location
    if (searchMethod.value === "state") {
        locationsArray.forEach(function(state) {
            listStates.innerHTML += `<option value=\"${state}\">${state}</option>`;
            document.querySelector("#byLoc").classList.remove("d-none");
            document.querySelector("#byType").classList.add("d-none");
            showTheParks.classList.remove("d-none");
        });
    }
    // serach by park type
    else if (searchMethod.value === "type") {
        parkTypesArray.forEach(function(park) {
            listTypes.innerHTML += `<option value=\"${park}\">${park}</option>`;
            document.querySelector("#byType").classList.remove("d-none");
            document.querySelector("#byLoc").classList.add("d-none");
            showTheParks.classList.remove("d-none");
        });
    }
    // if blank is selected after another choice has been made
    else {
        document.querySelector("#byType").classList.add("d-none");
        document.querySelector("#byLoc").classList.add("d-none");
        showTheParks.classList.add("d-none");
        alert("You must select an option.");
    }
}

// Display parks
showTheParks.addEventListener("click", function(event) {
    // starts by clearing out all <li> elements within the <ul> to produce a clean list
    showParksList.innerHTML = "";

    if (searchMethod.value === "state") {
        // creates a variable to store the state chosen in the drop-down
        let chosenState = listStates.value;
    
        // filters the array of all parks based on the chosen state above, then stores the results in a new array
        const filteredParksList = nationalParksArray.filter((park) => {
            return park.State === chosenState;
        })

        // using the filtered array above, creates new <li> elements for each park, using only the names of the parks
        filteredParksList.forEach(function(parks) {
            showParksList.innerHTML += `<li>${parks.LocationName}</li>`;
        });
    }
    else if (searchMethod.value === "type") {
        let chosenType = listTypes.value;
        const filteredParksList = nationalParksArray.filter((park) => {
            // uses lower-case to ensure there are matches even if casing is off
            let parkString = park.LocationName.toLowerCase();
            return parkString.includes(chosenType.toLowerCase());
        })

        // using the filtered array above, creates new <li> elements for each park, using only the names of the parks
        filteredParksList.forEach(function(parks) {
            showParksList.innerHTML += `<li>${parks.LocationName}</li>`;
        });
    }
});