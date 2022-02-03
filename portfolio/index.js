import i18Obj from "./translate.js";

const burgerButton = document.querySelector(".burger-menu");
const burgerMenu = document.querySelector(".nav");
const burgerLink = document.querySelectorAll(".nav-link");

const langButtons = document.querySelectorAll(".lang-button");
const translateItems = document.querySelectorAll("[data-i18]");

const lightButton = document.querySelector("[data-light]");
const headerContainer = document.querySelector(".header-container");
const heroContainer = document.querySelector(".hero-container");
const contactsContainer = document.querySelector(".contacts-container");
const contactsInput = document.querySelectorAll(".contacts-input");

const portfolioButtons = document.querySelectorAll(".portfolio-button");
const portfolioImgs = document.querySelectorAll(".portfolio-img");

const allButtons = document.querySelectorAll("button");
const allLinks = document.querySelectorAll("a");

const selectedLang = localStorage.getItem("lang") || "en";
const selectedPortfolio = localStorage.getItem("portfolio") || "winter";
const selectedLight = localStorage.getItem("light") || "sun";

//=====ПРИ ЗАГРУЗКЕ СТРАНИЦЫ=====

getTranslate(
  selectedLang,
  Array.from(langButtons).find((button) => button.dataset.lang === selectedLang)
);

changeLight(selectedLight);

changePortfolio(
  selectedPortfolio,
  Array.from(portfolioButtons).find(
    (button) => button.dataset.season === selectedPortfolio
  )
);

["winter", "spring", "summer", "autumn"].forEach((season) => {
  for (let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `./assets/img/${season}/${i}.jpg`;
  }
});

// =====МЕНЮ=====

const closeMenu = () => {
  if (burgerMenu.classList.contains("burger-menu-active")) {
    burgerButton.classList.remove("burger-active");
    burgerMenu.classList.remove("burger-menu-active");
  }
};

burgerButton.addEventListener("click", () => {
  burgerButton.classList.toggle("burger-active");
  burgerMenu.classList.toggle("burger-menu-active");
});

burgerLink.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (ev) => {
  if (
    !ev.composedPath().includes(burgerMenu) &&
    !ev.composedPath().includes(burgerButton)
  ) {
    closeMenu();
  }
});

document.addEventListener("keydown", function (ev) {
  if (ev.key == "Escape") {
    closeMenu();
  }
});

document.querySelector(".contact-form").addEventListener("submit", (ev) => {
  ev.preventDefault();
});

// =====СМЕНА ПОРТФОЛИО=====

function changePortfolio(folder, button) {
  for (let i = 0; i < portfolioImgs.length; i++) {
    portfolioImgs[i].src = `./assets/img/${folder}/${i + 1}.jpg`;
  }
  portfolioButtons.forEach((but) =>
    but.classList.remove("portfolio-button-active")
  );
  button.classList.add("portfolio-button-active");
  localStorage.setItem("portfolio", folder);
}

portfolioButtons.forEach((button) =>
  button.addEventListener("click", (ev) =>
    changePortfolio(ev.target.dataset.season, button)
  )
);

// =====СМЕНА ЯЗЫКА=====

function getTranslate(lang, button) {
  translateItems.forEach((item) => {
    item.placeholder
      ? (item.placeholder = i18Obj[lang][item.dataset.i18])
      : (item.textContent = i18Obj[lang][item.dataset.i18]);
  });
  langButtons.forEach((but) => but.classList.remove("lang-button-active"));
  button.classList.add("lang-button-active");
  localStorage.setItem("lang", lang);
}

langButtons.forEach((button) => {
  button.addEventListener("click", (ev) =>
    getTranslate(ev.target.dataset.lang, button)
  );
});

// =====СМЕНА ЦВЕТОВОЙ СХЕМЫ======

function changeLight(light) {
  if (light === "sun") {
    document.documentElement.style.setProperty("--colorWB", "#000000");
    document.documentElement.style.setProperty("--colorBW", "#ffffff");
    document.documentElement.style.setProperty("--colorBG", "#bdae82");
    document.documentElement.style.setProperty("--colorGW", "#ffffff");
    document.documentElement.style.setProperty("--colorGB", "#000000");

    headerContainer.style.backgroundImage =
      "url('./assets/img/header-bg-light.jpg')";
    heroContainer.style.backgroundImage =
      "url('./assets/img/header-bg-light.jpg')";
    contactsContainer.style.backgroundImage =
      "url('./assets/img/contacts-bg-light.jpg')";
    contactsInput.forEach(
      (input) => (input.style.backgroundColor = "rgba(255, 255, 255, 0.5)")
    );

    lightButton.dataset.light = "moon";
    lightButton.innerHTML = `<use xlink:href="./assets/svg/sprite.svg#moon" data-light="moon"></use>`;

    localStorage.setItem("light", "sun");
  } else {
    document.documentElement.style.setProperty("--colorWB", "#ffffff");
    document.documentElement.style.setProperty("--colorBW", "#000000");
    document.documentElement.style.setProperty("--colorBG", "#000000");
    document.documentElement.style.setProperty("--colorGW", "#bdae82");
    document.documentElement.style.setProperty("--colorGB", "#bdae82");

    headerContainer.style.backgroundImage = "url('./assets/img/header-bg.jpg')";
    heroContainer.style.backgroundImage = "url('./assets/img/header-bg.jpg')";
    contactsContainer.style.backgroundImage =
      "url('./assets/img/contacts-bg.jpg')";
    contactsInput.forEach(
      (input) => (input.style.backgroundColor = "rgba(0, 0, 0, 0.5)")
    );

    lightButton.dataset.light = "sun";
    lightButton.innerHTML = `<use xlink:href="./assets/svg/sprite.svg#sun" data-light="sun"></use>`;

    localStorage.setItem("light", "moon");
  }
}

lightButton.addEventListener("click", (ev) =>
  changeLight(ev.target.dataset.light)
);

// ======НАЖАТИЕ КНОПКИ=====
function buttonClick(ev, button) {
  const x = ev.pageX;
  const y = ev.pageY;

  const buttonTop = ev.target.offsetTop;
  const buttonLeft = ev.target.offsetLeft;

  const xInside = x - buttonLeft;
  const yInside = y - buttonTop;

  const circle = document.createElement("span");
  circle.classList.add("circle");
  circle.style.top = yInside + "px";
  circle.style.left = xInside + "px";

  button.appendChild(circle);

  setTimeout(() => circle.remove(), 500);
}

allButtons.forEach((button) =>
  button.addEventListener("click", (ev) => buttonClick(ev, button))
);
langButtons.forEach((button) =>
  button.addEventListener("click", (ev) => buttonClick(ev, button))
);
allLinks.forEach((link) =>
  link.addEventListener("click", (ev) => buttonClick(ev, link))
);
