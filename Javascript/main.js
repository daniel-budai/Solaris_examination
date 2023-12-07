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

/* comment 
Hämtar innehåller i planet arrayen. och skriver ut det med .innerText planet.name - alltså namnet på planeten. name: Jorden
alla get element by ID gör det. Sätter en br för radbrytning som i Figman och sluter den i en span tag för att sedan style:a i CSS.
Jag valde att göra om denna function då jag tidigare style:ade CSS:en i JS, vilket kan ses som bad practise och själv upplevde jag det
som pladdrigt och svårläst.
End comment */
const openOverlay = function (planet) {
  document.getElementById("latin-name").innerText = planet.name;
  document.getElementById("planet-name").innerText = planet.latinName;
  document.getElementById("planet-description").innerText = planet.desc;
  document.getElementById("planet-circumference").innerHTML = `OMKRETS<br><span>${planet.circumference}`; // prettier-ignore
  document.getElementById("planet-distance").innerHTML = `KM FRÅN SOLEN<br><span>${planet.distance}`; // prettier-ignore
  document.getElementById("planet-maxTemp").innerHTML = `MAX TEMPARATUR<br><span>${planet.temp.day}`; // prettier-ignore
  document.getElementById("planet-minTemp").innerHTML = `MIN TEMPARATUR<br><span>${planet.temp.night}`; // prettier-ignore
  document.getElementById("overlay").style.display = "inline-block";
  const moonContainer = document.getElementById("planet-moons");
  const moonsContent = handleMoonsContent(planet);
  moonContainer.innerHTML = moonsContent;
  generateStars();
};

/* comment 
Denna function var tidigare sammansluten med openOverlay. Jag har valt att göra den till en egen funktion i och med att jag utvecklade 
den till mer avancerad funktion och då blir det lättre att underhålla och mer i samma veva mer läsvänlig. 
Tar emot parametern planet och arrayen moons i planets. Skapar en sträng för att visa innehållet i moons. Om planeten inte har månar
skriver den ut det annars skriver den ut planeterna med en loop, adderar en punkt i slutet, och komma-tecken mellan varje moon.
End comment */
const handleMoonsContent = (planet) => {
  let moonsContent = `MÅNAR<br><span class="moon-list">`;
  if (planet.moons.length === 0) {
    moonsContent += `${planet.name} har inga månar.`;
  } else {
    planet.moons.forEach((moon, index) => {
      moonsContent += `${index > 0 ? ", " : ""}${moon}${
        index === planet.moons.length - 1 ? "." : ""
      }`;
    });
  }
  moonsContent += `</span>`;
  return moonsContent;
};

/* comment
Hanterar stjärnorna i overlay. Jag ville göra stjärnorna identiska till Figman, fick det till 36 stjärnorn, kan vara fler. ?
Skapar 36 stjärnor med en loop. För varje iteration skapas ett nytt div-element unikt ID star.id = `star-${i + 1}`; , 
och läggs till i starsContainer. 
End comment */
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

/* comment
 closeOverlay - för att stänga ner overlay 
 Callback funktion för att öppna overlayen
End comment */

const closeOverlay = () => (document.getElementById("overlay").style.display = "none"); // prettier-ignore

const addClickListener = (button, callback) => button.addEventListener("click", callback); // prettier-ignore

const planetContainer = document.getElementById("planet-container"); //planetContainer fungerar som behållare planetinformationen

/* comment
Ändra klassnamnet på planet-container, nollställ classNamnet med tom sträng, sedan .add för att lägga till nya
används för att ändra stilen  av planetContainer baserat på vilken planet som visas. 
Lägger sedan till eventlisteners på de olika knapparna, varje clickevent ändrar stilen. Te.x om man öppnar venusButton, ändras stilen
till venus-container. 
Öppnar overlay med .find, är en metod för att hitta objektet i arrayen med samma namn med jämnförelseoperatorn. name: solen === "Solen" 
anonymus functions
End comment */
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

/* comment
Skickar async POST-request till base_url med enpointen /keys för att få nycklen.
Nyckeln i respone.json. 
Om något fel skickas error ut i catch, Try and catch

GET-request till base_url med enpointen /bodies. I headers: sätter jag key variabeln från tidigare request
Om något fel sker, loggas error,  - Try and catch

Anropar funktionerna, Först getKey() när nycklen är hämtad går den vidare till .then() som tar nyckeln som argument och
skickar in i  getPlanets() med arguemnt går sedan vidare till json bodies och sparar ner den i variabeln planets.
Man kan se det som en kedja, kallas för promise-chaining. 
 End comment */

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
