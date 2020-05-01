const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
const breedSelector = document.querySelector("#breed");
const breedImg = document.querySelector("#main");
const loader = document.querySelector("#loader");

init();

async function init() {
    // populate breed list
    const res = await fetch(BREEDS_URL);
    const resJson = await res.json();
    let breedOptions = "<option selected>Select a breed...</option>";
    let breedList = Object.keys(resJson.message);

    for(let i = 0; i < breedList.length; i++) {
        breedOptions += `<option value=${breedList[i]}>${breedList[i]}</option>`;
    }

    breedSelector.innerHTML = breedOptions;

    // get first image
    const randomRes = await fetch("https://dog.ceo/api/breeds/image/random");
    const randomResJson = await randomRes.json();
    breedImg.src = randomResJson.message;

    // add event listeners
    breedSelector.addEventListener("change", handleBreedChange);
    breedImg.addEventListener("load", function() {
        breedImg.classList.add("show");
        loader.classList.remove("show");
    });
}

async function handleBreedChange() {
    breedImg.classList.remove("show");
    loader.classList.add("show");
    const breedName = event.target.value;
    const res = await fetch(`https://dog.ceo/api/breed/${breedName}/images/random`);
    const resJson = await res.json();
    
    breedImg.src = resJson.message;
}


