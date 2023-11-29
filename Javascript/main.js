//#region Variables
let BASE_URL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com";
let sunButton = document.getElementById("sun");
let mercuryButton = document.getElementById("mercury");
let venusButton = document.getElementById("venus");
let earthButton = document.getElementById("earth");
let marsButton = document.getElementById("mars");
let jupiterButton = document.getElementById("jupiter");
let saturnButton = document.getElementById("saturn");
let uranusButton = document.getElementById("uranus");
let neptuneButton = document.getElementById("neptune");
//#endregion

// #region Overlay
const openOverlay = () =>
  (document.getElementById("overlay").style.display = "flex");

const closeOverlay = () =>
  (document.getElementById("overlay").style.display = "none");

const addClickListener = (button, callback) =>
  button.addEventListener("click", callback);
// #endregion

addClickListener(sunButton, openOverlay);
addClickListener(mercuryButton, openOverlay);
addClickListener(venusButton, openOverlay);
addClickListener(earthButton, openOverlay);
addClickListener(marsButton, openOverlay);
addClickListener(jupiterButton, openOverlay);
addClickListener(saturnButton, openOverlay);
addClickListener(uranusButton, openOverlay);
addClickListener(neptuneButton, openOverlay);
addClickListener(document.getElementById("x"), closeOverlay);

// #region functions for API
async function getKey() {
  try {
    const response = await fetch(
      "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys",
      {
        method: "POST",
        headers: {},
      }
    );
    const { key } = await response.json();
    //console.log(key);
    return key;
  } catch (error) {
    console.error(error);
  }
}

async function getPlanets(key) {
  try {
    const response = await fetch(
      "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies",
      {
        method: "GET",
        headers: { "x-zocom": key },
      }
    );
    const { bodies } = await response.json();
    console.log(bodies);
    return bodies;
  } catch (error) {
    console.log(error);
  }
}
getKey().then((key) => getPlanets(key));
//#endregion
