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

const openOverlay = function (planet) {
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

  document.getElementById("overlay").style.display = "inline-block"; //not sure

  const moonContainer = document.getElementById("planet-moons");
  moonContainer.innerHTML = `<strong style="font-weight: 900; font-family: 'Secular One';">MÅNAR</strong><br>`;

  planet.moons.forEach((moon, index) => {
    moonContainer.innerHTML += `${moon}${
      index < planet.moons.length - 1 ? ", " : ""
    }`;
  });

  generateStars();

  document.getElementById("overlay").style.display = "inline-block";
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

const closeOverlay = () =>
  (document.getElementById("overlay").style.display = "none");

const addClickListener = (button, callback) =>
  button.addEventListener("click", callback);

const planetContainer = document.getElementById("planet-container");

const updatePlanetContainerStyles = (backgroundColor, boxShadow) => {
  planetContainer.style.backgroundColor = backgroundColor;
  planetContainer.style.boxShadow = boxShadow;
};

addClickListener(sunButton, () => {
  openOverlay(planets.find((planet) => planet.name === "Solen"));
  updatePlanetContainerStyles(
    "#ffd029",
    "50px 1px 0px 20px rgb(255 208 41 / 15%), 37px 1px 0px 0px rgba(255, 208, 41, 0.3)"
  );
});
addClickListener(mercuryButton, () => {
  openOverlay(planets.find((planet) => planet.name === "Merkurius"));
  updatePlanetContainerStyles(
    "#888888",
    "50px 1px 0px 20px rgba(136, 136, 136, 0.15), 37px 1px 0px 0px rgba(136, 136, 136, 0.3)"
  );
});

addClickListener(venusButton, () => {
  openOverlay(planets.find((planet) => planet.name === "Venus"));
  updatePlanetContainerStyles(
    "#E7CDCD",
    "50px 1px 0px 20px rgba(199, 170, 114, 0.15), 37px 1px 0px 0px rgba(199, 170, 114, 0.3)"
  );
});

addClickListener(earthButton, () => {
  openOverlay(planets.find((planet) => planet.name === "Jorden"));
  updatePlanetContainerStyles(
    "#428ed4",
    "50px 1px 0px 20px rgba(66, 142, 212, 0.15), 37px 1px 0px 0px rgba(66, 142, 212, 0.3)"
  );
});

addClickListener(marsButton, () => {
  openOverlay(planets.find((planet) => planet.name === "Mars"));
  updatePlanetContainerStyles(
    "#ef5f5f",
    "50px 1px 0px 20px rgba(239, 95, 95, 0.15), 37px 1px 0px 0px rgba(239, 95, 95, 0.3)"
  );
});

addClickListener(jupiterButton, () => {
  openOverlay(planets.find((planet) => planet.name === "Jupiter"));
  updatePlanetContainerStyles(
    "#e29468",
    "50px 1px 0px 20px rgba(226, 148, 104, 0.15), 37px 1px 0px 0px rgba(226, 148, 104, 0.3)"
  );
});

addClickListener(saturnButton, () => {
  openOverlay(planets.find((planet) => planet.name === "Saturnus"));
  updatePlanetContainerStyles(
    "#c7aa72",
    "50px 1px 0px 20px rgba(199, 170, 114, 0.15), 37px 1px 0px 0px rgba(199, 170, 114, 0.3)"
  );
});

addClickListener(uranusButton, () => {
  openOverlay(planets.find((planet) => planet.name === "Uranus"));
  updatePlanetContainerStyles(
    "#c9d4f1",
    "50px 1px 0px 20px rgba(201, 212, 241, 0.15), 37px 1px 0px 0px rgba(201, 212, 241, 0.3)"
  );
});

addClickListener(neptuneButton, () => {
  openOverlay(planets.find((planet) => planet.name === "Neptunus"));
  updatePlanetContainerStyles(
    "#7a91a7",
    "50px 1px 0px 20px rgba(122, 145, 167, 0.15), 37px 1px 0px 0px rgba(122, 145, 167, 0.3)"
  );
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
    console.log(bodies);
    return bodies;
  } catch (error) {
    console.log(error);
  }
}
getKey()
  .then((key) => getPlanets(key))
  .then((bodies) => (planets = bodies));
