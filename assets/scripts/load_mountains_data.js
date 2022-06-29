"use strict"

let mountainsArray = []
const mountainsList = document.querySelector("#mountains");

window.onload = function(){

    loadJsonData("assets/data/mountains.json").then((mountains) => {
        mountainsArray = mountains.mountains;

        // Populate the drop-down list as soon as the data is loaded
        mountainsArray.forEach(function(mountain) {
            mountainsList.innerHTML += `<option value="${mountain.name}">${mountain.name}</option>`
        });
    })

}

//function that can "fetch" the sunset/sunrise times
let loadJsonData = async (path) => {
    let response = await fetch(path)
    let data = await response.json()
    return data
}