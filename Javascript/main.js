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
let planets = [];
//#endregion

// #region Overlay

const openOverlay = function (planet) {
  //console.log(planet);
  document.getElementById("latin-name").innerText = planet.name;
  document.getElementById("planet-name").innerText = planet.latinName;
  document.getElementById("planet-description").innerText = planet.desc;
  document.getElementById(
    "planet-circumference"
  ).innerHTML = `<strong style="font-weight: 900; font-family: 'Secular One';">OMKRETS</strong><br>${planet.circumference}`;
  document.getElementById(
    "planet-distance"
  ).innerHTML = `<strong style="font-weight: 900; font-family: 'Secular One';">KM FRÅN SOLEN</strong><br>${planet.distance}`;
  document.getElementById(
    "planet-maxTemp"
  ).innerHTML = `<strong style="font-weight: 900; font-family: 'Secular One';">MAX TEMPARATUR</strong><br>${planet.temp.day}`;
  document.getElementById(
    "planet-minTemp"
  ).innerHTML = `<strong style="font-weight: 900; font-family: 'Secular One';">MIN TEMPARATUR</strong><br>${planet.temp.night}`;

  document.getElementById("overlay").style.display = "inline-block";
  const moonContainer = document.getElementById("planet-moons");
  moonContainer.innerHTML = `<strong style="font-weight: 900; font-family: 'Secular One';">MÅNAR</strong><br>`;

  planet.moons.forEach((moon, index) => {
    moonContainer.innerHTML += `${moon}${
      index < planet.moons.length - 1 ? ", " : ""
    }`;
  });

  document.getElementById("overlay").style.display = "inline-block";
};

const closeOverlay = () =>
  (document.getElementById("overlay").style.display = "none");

const addClickListener = (button, callback) =>
  button.addEventListener("click", callback);

addClickListener(sunButton, () =>
  openOverlay(planets.find((planet) => planet.name === "Solen"))
);

addClickListener(mercuryButton, () =>
  openOverlay(planets.find((planet) => planet.name === "Merkurius"))
);

addClickListener(venusButton, () =>
  openOverlay(planets.find((planet) => planet.name === "Venus"))
);

addClickListener(earthButton, () =>
  openOverlay(planets.find((planet) => planet.name === "Jorden"))
);

addClickListener(marsButton, () =>
  openOverlay(planets.find((planet) => planet.name === "Mars"))
);

addClickListener(jupiterButton, () =>
  openOverlay(planets.find((planet) => planet.name === "Jupiter"))
);

addClickListener(saturnButton, () =>
  openOverlay(planets.find((planet) => planet.name === "Saturnus"))
);

addClickListener(uranusButton, () =>
  openOverlay(planets.find((planet) => planet.name === "Uranus"))
);

addClickListener(neptuneButton, () =>
  openOverlay(planets.find((planet) => planet.name === "Neptunus"))
);

addClickListener(document.getElementById("x"), closeOverlay);

async function getKey() {
  try {
    const response = await fetch(`${BASE_URL}/keys`, {
      method: "POST",
      headers: {},
    });
    const { key } = await response.json();
    //console.log(key);
    return key;
  } catch (error) {
    console.error(error);
  }
}

async function getPlanets(key) {
  try {
    const response = await fetch(`${BASE_URL}/bodies`, {
      method: "GET",
      headers: { "x-zocom": key },
    });
    const { bodies } = await response.json();
    console.log(bodies);
    return bodies;
  } catch (error) {
    console.log(error);
  }
}
getKey()
  .then((key) => getPlanets(key))
  .then((bodies) => (planets = bodies));
