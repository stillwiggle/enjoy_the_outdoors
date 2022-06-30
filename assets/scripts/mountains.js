"use strict"
// This file has mountainsArray available to it because mountains.html has load_mountains_data.js loaded above this file.

// Global variables for specific DOM elements
const detailsTable = document.querySelector("#mountainDetails");
const effortList = document.querySelector("#effort");

// Mountains drop-down: When a changes is made to the selection
mountainsList.addEventListener("change", (event) => {

    // Clears the data from the table
    detailsTable.innerHTML = "";

    // Changes the Effort drop-down to reset to default (avoids confusion)
    effortList.value = "no-selection";

    // creates the table row data (2 columns)
    if(event.target.value !== "no-selection") {

        // find the object in the array which matches with the selection in the drop-down
        const chosenMountain = mountainsArray.find(mountain => mountain.name === event.target.value);

        // Runs the function that creates table element HTML
        populateTable(chosenMountain);
        
    }
});


// Effort drop-down: when a changes is made to the selection
effortList.addEventListener("change", (event) => {

    // Clears the data from the table
    detailsTable.innerHTML = "";

    // Clears Mountains drop-down to reset to default (avoids confusion)
    mountainsList.value = "no-selection";

    // creates the table row data (2 columns)
    if(event.target.value !== "no-selection") {

        // find the object in the array which matches with the selection in the drop-down
        const filteredEffortArray = mountainsArray.filter((mountain) => {
            return mountain.effort.includes(event.target.value);
        });

        // Runs the function that creates table element HTML (using forEach since multiple mountains will be selected)
        filteredEffortArray.forEach((peak) => {
            populateTable(peak);
        });
        
    }
});

function populateTable (chosenValue) {
    return detailsTable.innerHTML += `<tr>
            <td>
                <h2>${chosenValue.name}</h2>
                <img src="/assets/images/mountains/${chosenValue.img}" alt="View of ${chosenValue.name}"></img>
            </td>
            <td>
                <table border="1" bordercolor = "#FFFFFF" class="table-responsive table align-top">
                    <tr>
                        <td>Description:</td>
                        <td>${chosenValue.desc}</td>
                    </tr>
                    <tr>
                        <td>Elevation:</td>
                        <td>${chosenValue.elevation.toLocaleString('en-US')} ft</td>
                    </tr>
                    <tr>
                        <td>Effort:</td>
                        <td>${chosenValue.effort}</td>
                    </tr>
                    <tr>
                        <td><a href="https://maps.google.com/?q=${chosenValue.coords.lat},${chosenValue.coords.lng}" id="mapBtn" title="Google Maps" class="btn btn-primary" target="_blank">Map</a></td>
                    </tr>
                </table>
            </td>
        </tr>`;
}

//function that can "fetch" the sunset/sunrise times
// Can't get this working behind LM network
async function getSunsetForMountain(lat, lng){
    let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`)
    let data = await response.json()
    return data
}

// //Using the function to fetch the sunset/sunrise times for a specific mountain 
// getSunsetForMountain("44.320686", "-71.291742").then(sunsetData => {
//     console.log(sunsetData.results)
// });