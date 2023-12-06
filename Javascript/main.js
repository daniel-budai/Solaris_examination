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

const openOverlay = function (planet) {
  document.getElementById("latin-name").innerText = planet.name;
  document.getElementById("planet-name").innerText = planet.latinName;
  document.getElementById("planet-description").innerText = planet.desc;
  document.getElementById("planet-circumference").innerHTML = `<strong style="font-weight: 900; font-family: 'Secular One';">OMKRETS</strong><br>${planet.circumference}`; // prettier-ignore
  document.getElementById("planet-distance").innerHTML = `<strong style="font-weight: 900; font-family: 'Secular One';">KM FRÅN SOLEN</strong><br>${planet.distance}`; // prettier-ignore
  document.getElementById("planet-maxTemp").innerHTML = `<strong style="font-weight: 900; font-family: 'Secular One';">MAX TEMPARATUR</strong><br>${planet.temp.day}`; // prettier-ignore
  document.getElementById("planet-minTemp").innerHTML = `<strong style="font-weight: 900; font-family: 'Secular One';">MIN TEMPARATUR</strong><br>${planet.temp.night}`; // prettier-ignore
  document.getElementById("overlay").style.display = "inline-block";

  const moonContainer = document.getElementById("planet-moons");
  moonContainer.innerHTML = `<strong style="font-weight: 900; font-family: 'Secular One';">MÅNAR</strong><br>`;

  planet.moons.forEach((moon, index) => {
    moonContainer.innerHTML += `${moon}${
      index < planet.moons.length - 1 ? ", " : "."
    }`;
  });
  generateStars();
};

const generateStars = () => {
  const starsContainer = document.getElementById("stars-container");
  starsContainer.innerHTML = "";
  const numberOfStars = 36;
  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.id = `star-${i + 1}`;
    star.className = "star";
    starsContainer.appendChild(star);
  }
};

const closeOverlay = () => (document.getElementById("overlay").style.display = "none"); // prettier-ignore

const addClickListener = (button, callback) => button.addEventListener("click", callback); // prettier-ignore

const planetContainer = document.getElementById("planet-container");

const updatePlanetContainerStyles = (planetClassName) => {
  planetContainer.className = "";
  planetContainer.classList.add(planetClassName);
};

addClickListener(sunButton, () => {
  openOverlay(planets.find((planet) => planet.name === "Solen"));
  updatePlanetContainerStyles("sun-container");
});

addClickListener(mercuryButton, () => {
  openOverlay(planets.find((planet) => planet.name === "Merkurius"));
  updatePlanetContainerStyles("mercury-container");
});

addClickListener(venusButton, () => {
  openOverlay(planets.find((planet) => planet.name === "Venus"));
  updatePlanetContainerStyles("venus-container");
});

addClickListener(earthButton, () => {
  openOverlay(planets.find((planet) => planet.name === "Jorden"));
  updatePlanetContainerStyles("earth-container");
});

addClickListener(marsButton, () => {
  openOverlay(planets.find((planet) => planet.name === "Mars"));
  updatePlanetContainerStyles("mars-container");
});

addClickListener(jupiterButton, () => {
  openOverlay(planets.find((planet) => planet.name === "Jupiter"));
  updatePlanetContainerStyles("jupiter-container");
});

addClickListener(saturnButton, () => {
  openOverlay(planets.find((planet) => planet.name === "Saturnus"));
  updatePlanetContainerStyles("saturn-container");
});

addClickListener(uranusButton, () => {
  openOverlay(planets.find((planet) => planet.name === "Uranus"));
  updatePlanetContainerStyles("uranus-container");
});

addClickListener(neptuneButton, () => {
  openOverlay(planets.find((planet) => planet.name === "Neptunus"));
  updatePlanetContainerStyles("neptune-container");
});

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
    //console.log(bodies);
    return bodies;
  } catch (error) {
    console.log(error);
  }
}
getKey()
  .then((key) => getPlanets(key))
  .then((bodies) => (planets = bodies));
