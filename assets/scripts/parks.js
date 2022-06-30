"use strict"
// This file has locationsArray, nationalParksArray, parkTypesArray available to it because parks.html has load_national_parks_data.js loaded above this file.

const searchMethod = document.querySelector("#searchMethod");       // drop-down to determine the search method
const listStates = document.querySelector("#stateSelection");       // drop-down listing out the available states to search by
const listTypes = document.querySelector("#typeSelection");         // drop-down listing out the Park Types to search by
const showTheParks = document.querySelector("#showParks");          // button for displaying the parks based upon selected filters
const showParksList = document.querySelector("#parkList");          // <ul> where the filtered parks list will display

// Drop-down populates if Location is selected as the search method
searchMethod.onchange = (event) => {
    showParksList.innerHTML = "";
    // Search by location
    if (searchMethod.value === "state") {
        locationsArray.forEach(function(state) {
            listStates.innerHTML += `<option value=\"${state}\">${state}</option>`;
            document.querySelector("#byLoc").classList.remove("d-none");    // Displays the State (byLoc) drop-down
            document.querySelector("#byType").classList.add("d-none");      // Hides the Park Type (byType) drop-down
            showTheParks.classList.remove("d-none");                        // Displays the Show Parks button
        });
    }
    // search by park type
    else if (searchMethod.value === "type") {
        parkTypesArray.forEach(function(park) {
            listTypes.innerHTML += `<option value=\"${park}\">${park}</option>`;
            document.querySelector("#byType").classList.remove("d-none");   // Displays the Park Type (byType) drop-down
            document.querySelector("#byLoc").classList.add("d-none");       // Hides the State (byLoc) drop-down
            showTheParks.classList.remove("d-none");                        // Displays the Show Parks button
        });
    }
    // display all parks (no search)
    else if (event.target.value === "all-Parks") {
        showParks(nationalParksArray);
        document.querySelector("#byType").classList.add("d-none");      // Hides the Park Type (byType) drop-down
        document.querySelector("#byLoc").classList.add("d-none");       // Hides the State (byLoc) drop-down
        showTheParks.classList.add("d-none");                           // Hides the Show Parks button
    }
    // if blank is selected after another choice has been made
    else {
        document.querySelector("#byType").classList.add("d-none");          // Hides the Park Type (byType) drop-down
        document.querySelector("#byLoc").classList.add("d-none");           // Hides the State (byLoc) drop-down
        showTheParks.classList.add("d-none");                               // Hides the Show Parks button
    }
}

// Display parks
showTheParks.addEventListener("click", function(event) {
    // starts by clearing out all <li> elements within the <ul> to produce a clean list
    showParksList.innerHTML = "";

    // Filtering method when Location is the search method
    if (searchMethod.value === "state") {
        // creates a variable to store the state chosen in the drop-down
        let chosenState = listStates.value;
    
        // filters the array of all parks based on the chosen state above, then stores the results in a new array
        const filteredParksList = nationalParksArray.filter((park) => {
            return park.State === chosenState;
        })

        // using the filtered array above, creates new <li> elements for each park, using only the names of the parks
        showParks(filteredParksList);
    }
    // Filtering method when Park Type is the search method
    else if (searchMethod.value === "type") {
        let chosenType = listTypes.value;
        const filteredParksList = nationalParksArray.filter((park) => {
            // uses lower-case to ensure there are matches even if casing is off
            let parkString = park.LocationName.toLowerCase();
            return parkString.includes(chosenType.toLowerCase());
        })

        // using the filtered array above, creates new <li> elements for each park, using only the names of the parks
        showParks(filteredParksList);
    }
});

function showParks (filteredArray) {
    filteredArray.forEach(function(parks) {
        // Address field: 0 = no address displayed.  Anything else gets a string
        let address = "";
        if (parks.Address !== 0) {
            // attempts to remove the park's name from the address (isn't always succesful due to abbreviations and special characters)
            address = parks.Address.split(`${parks.LocationName}, `).pop();
        }

        // Phone field: 0 = no phone line displayed.  Anything else gets a string
        let phone = "";
        if (parks.Phone !== 0) {
            phone = `Phone: ${parks.Phone}<br>`;
        }

        // Fax field: 0 = no fax line displayed.  Anything else gets a string
        let fax = "";
        if (parks.Fax !== 0) {
            fax = `Fax: ${parks.Fax}`;
        }

        // Zip Code field: 0 = no zip code displayed in address.  Anything else gets a number
        let zip = ""
        if (parks.ZipCode !== 0) {
            zip = `${parks.ZipCode}`;
        }

        // checks to see if an object has a Visit property.  If it does, then create HTML for the website as a string to be used below.
        let website = "";
        if (parks.hasOwnProperty('Visit')) {
            website = `Website: <a href="${parks.Visit}" target="_blank">${parks.Visit}</a>`;
        }

        // Creates the full HTML code for the table row for this entry
        showParksList.innerHTML += `
            <tr>
                <td>
                    <h2>${parks.LocationName}</h2>
                    ${address}<br>
                    ${parks.City}, ${parks.State} ${zip}<br>
                    <a href="https://maps.google.com/?q=${parks.Latitude},${parks.Longitude}" class="btn btn-primary" target="_blank">Map</a>
                </td>
                <td>
                    ${website}<br>
                    ${phone}
                    ${fax}
                </td>
            </tr>`;
    });
}