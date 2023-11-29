let sunButton = document.getElementById("sun");
let mercuryButton = document.getElementById("mercury");
let venusButton = document.getElementById("venus");
let earthButton = document.getElementById("earth");
let marsButton = document.getElementById("mars");
let jupiterButton = document.getElementById("jupiter");
let saturnButton = document.getElementById("saturn");
let uranusButton = document.getElementById("uranus");
let neptuneButton = document.getElementById("neptune");

const openOverlay = () =>
  (document.getElementById("overlay").style.display = "flex");

const closeOverlay = () =>
  (document.getElementById("overlay").style.display = "none");

const addClickListener = (button, callback) =>
  button.addEventListener("click", callback);

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
