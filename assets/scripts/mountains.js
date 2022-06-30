"use strict"

// This file has mountainsArray available to it because mountains.html has load_mountains_data.js loaded above this file.

// Mountain efforts: Strenuous, Moderate to Strenuous, Moderate

// Global variables for specific DOM elements
const detailsTable = document.querySelector("#mountainDetails");

// When a changes is made to the drop-down selection
mountainsList.addEventListener("change", (event) => {
    // Clears the data from the table
    detailsTable.innerHTML = "";

    // creates the table row data (2 columns)
    if(event.target.value !== "no-selection") {
        // find the object in the array which matches with the selection in the drop-down
        const chosenMountain = mountainsArray.find(mountain => mountain.name === event.target.value);

        // sunrise/sunset data - storing as a variable
        // let sunset = getSunsetForMountain(chosenMountain.coords.lat, chosenMountain.coords.lng).then(sunsetData => {
        //     console.log(sunsetData.results)
        // });

        detailsTable.innerHTML += `<tr>
            <td>
                <h2>${chosenMountain.name}</h2>
                <img src="/assets/images/mountains/${chosenMountain.img}" alt="View of ${chosenMountain.name}"></img>
            </td>
            <td>
                <table border="1" bordercolor = "#FFFFFF" class="table-responsive table align-top">
                    <tr>
                        <td>Description:</td>
                        <td>${chosenMountain.desc}</td>
                    </tr>
                    <tr>
                        <td>Elevation:</td>
                        <td>${chosenMountain.elevation.toLocaleString('en-US')} ft</td>
                    </tr>
                    <tr>
                        <td>Effort:</td>
                        <td>${chosenMountain.effort}</td>
                    </tr>
                    <tr>
                        <td><a href="https://maps.google.com/?q=${chosenMountain.coords.lat},${chosenMountain.coords.lng}" id="mapBtn" title="Google Maps" class="btn btn-primary" target="_blank">Map</a></td>
                    </tr>
                </table>
            </td>
        </tr>`;
    }
});

//function that can "fetch" the sunset/sunrise times
async function getSunsetForMountain(lat, lng){
    let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`)
    let data = await response.json()
    return data
}

// //Using the function to fetch the sunset/sunrise times for a specific mountain 
// getSunsetForMountain("44.320686", "-71.291742").then(sunsetData => {
//     console.log(sunsetData.results)
// });