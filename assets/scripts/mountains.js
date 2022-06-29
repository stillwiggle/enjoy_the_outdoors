"use strict"

// This file has mountainsArray available to it because mountains.html has load_mountains_data.js loaded above this file.

// Mountain efforts: Strenuous, Moderate to Strenuous, Moderate

// Global variables for specific DOM elements
const detailsTable = document.querySelector("#mountainDetails");

// When a changes is made to the drop-down selection
mountainsList.addEventListener("change", (event) => {
    // Clears the data from the table
    detailsTable.innerHTML = "";
    // find the object in the array which matches with the selection in the drop-down
    const chosenMountain = mountainsArray.find(mountain => mountain.name === event.target.value);
    // creates the table row data (2 columns)
    detailsTable.innerHTML += `<tr>
        <td>
            ${chosenMountain.name}
            <img src="/assets/images/mountains/${chosenMountain.img}" alt="View of ${chosenMountain.name}"></img>
        </td>
        <td>
            <ul>
                <li>Description: ${chosenMountain.desc}</li>
                <li>Elevation: ${chosenMountain.elevation}</li>
                <li>Effort: ${chosenMountain.effort}</li>
            </ul>
        </td>
    </tr>`;

})