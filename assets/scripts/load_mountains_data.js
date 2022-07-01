"use strict"

let mountainsArray = []
const mountainsList = document.querySelector("#mountains");
let alphaMountains = [];

window.onload = function(){

    loadJsonData("assets/data/mountains.json").then((mountains) => {
        mountainsArray = mountains.mountains;

        // Before populating the drop-down list, creates a new array that only contains mountain name and sorts them alphabetically
        mountainsArray.forEach(function(mountain) {
            
            alphaMountains.push(mountain.name);
            alphaMountains.sort();
        });

        // Populate the drop-down list as soon as the data is loaded
        alphaMountains.forEach((mountain) => {
            mountainsList.innerHTML += `<option value="${mountain}">${mountain}</option>`
        })

    })

}

//function that can "fetch" the sunset/sunrise times
let loadJsonData = async (path) => {
    let response = await fetch(path)
    let data = await response.json()
    return data
}