"use strict";

////////////////// APPLICATION //////////////////
/// INIT DOM VAR ///
// NAVIGATION //
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__links");
const navLink = document.querySelector(".nav__link");
// HEADER
const header = document.querySelector(".header");
// SECTIONS
const section1 = document.getElementById("section--1");
const allSections = document.querySelectorAll(".section");
allSections.forEach((el) => el.classList.add("section--hidden"));

// SMOOTH SCROLLING //
//TODO hidde it when viewport < xx
document.getElementById("back-to-top").addEventListener("click", function (e) {
  body.scrollIntoView({ behavior: "smooth" });
});

document
  .querySelector(".btn--scroll-to")
  .addEventListener("click", function (e) {
    // Current scroll
    /*     console.log(`Current scroll (X,Y)`, window.scrollX, window.scrollY);
     */ // Viewport width && height.
    /*  console.log(
      `Viewport width && height`,
      document.documentElement.clientHeight,
      document.documentElement.clientWidth
    ); */
    if (!document.documentElement.scrollIntoView) {
      // Related to the visible view port.
      const targetCoordinates = section1.getBoundingClientRect();
      //const triggerCoordinates = e.target.getBoundingClientRect();
      window.scrollTo({
        left: targetCoordinates.left + window.scrollX,
        top: targetCoordinates.top + window.scrollY,
        behavior: "smooth",
      });
    } else {
      section1.scrollIntoView({ behavior: "smooth" });
    }
  });
// NAVIGATION SMOOTH SCROLLING //
// NOT performant
/* const navLinks = document.querySelectorAll(".nav__link").forEach((el) =>
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href");
    const target = document.getElementById(id);
    target.scrollIntoView({ behavior: "smooth" });
  })
); */
// BETTER => use bubbling event.
// Add event listener to commun parent.
navLinks.addEventListener("click", function (e) {
  e.preventDefault();
  // Matching strategy.
  if (e.target.tagName === "A") {
    const id = e.target.getAttribute("href");
    const target = document.getElementById(id);
    target.scrollIntoView({ behavior: "smooth" });
  }
});
// NAVIGATION FADE OUT //
const setOpacity = function (e) {
  if (
    e.target.classList.contains("nav__link") ||
    e.target.classList.contains("nav__logo")
  ) {
    const links = e.currentTarget.querySelectorAll(".nav__link");
    const logo = e.currentTarget.querySelector(".nav__logo");
    links.forEach((el) => {
      if (el != e.target) {
        el.style.opacity = this;
      }
    });
    if (e.target != logo) {
      logo.style.opacity = this;
    }
  }
};
// HACK !!!!
// Passing an argument in an handler function.
// Work around to the fatct that event handler have just 1 argument (the event).
// For several arguments, pass an object or an array.
nav.addEventListener("mouseover", setOpacity.bind(0.5));
nav.addEventListener("mouseout", setOpacity.bind(1));

// STICKY NAVIGATION
// Bad performance
/* const initCoor = section1.getBoundingClientRect();
window.addEventListener("scroll", (e) => {
  if (this.scrollY >= initCoor.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}); */
// Better: using the NEW Intersection Observer API
const stickyNav = function (entries) {
  // == entries[0]
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${nav.clientHeight * -1}px`,
});
// When header enter or leave the viewport.
observer.observe(header);
// REVEAL SECTION
const revealSections = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    return;
  } else {
    entry.target.classList.remove("section--hidden");
    revealObserver.unobserve(entry.target);
  }
};
const revealObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((section) => {
  revealObserver.observe(section);
});

// TABULATIONS //
const opContainer = document.querySelector(".operations");
const opContents = opContainer.querySelectorAll(".operations__content");
document
  .querySelector(".operations__tab-container")
  .addEventListener("click", function (e) {
    const clicked = e.target.closest("BUTTON");
    if (!clicked) {
      return;
    }
    this.querySelectorAll(".operations__tab").forEach((el) =>
      el.classList.remove("operations__tab--active")
    );
    clicked.classList.add("operations__tab--active");
    opContents.forEach((e) =>
      e.classList.remove("operations__content--active")
    );
    const id = clicked.dataset.tab;
    const currentContent = opContainer.querySelector(
      `.operations__content--${id}`
    );
    currentContent.classList.add("operations__content--active");
  });

// MODAL WINDOW //
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnsOpenModal.forEach((button) => button.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// LAZY IMAGE LOADING
const lazyImgs = document.querySelectorAll("img[data-src]");
const loadLazyImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    return;
  }
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
    observerLazyImg.unobserve(entry.target);
  });
};

const observerLazyImg = new IntersectionObserver(loadLazyImg, {
  root: null,
  threshold: 0,
  rootMargin: "100px",
});
lazyImgs.forEach((img) => {
  observerLazyImg.observe(img);
});

// SLIDER
const slider = function () {
  // DOM
  const slides = document.querySelectorAll(".slide");
  const maxSlides = slides.length - 1;
  // btn.
  const btnRight = document.querySelector(".slider__btn--right");
  const btnLeft = document.querySelector(".slider__btn--left");
  // dots.
  const dotContainer = document.querySelector(".dots");
  // index;
  let currSlide = 0;
  // FUNCTIONS
  const mvSlides = function (currSlide) {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - currSlide) * 100}%)`;
    });
  };
  const prevSlide = function () {
    if (currSlide === 0) {
      currSlide = maxSlides;
    } else {
      currSlide--;
    }
    mvSlides(currSlide);
    activeDot(currSlide);
  };
  const nextSlide = function () {
    if (currSlide === maxSlides) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    activeDot(currSlide);
    mvSlides(currSlide);
  };
  const activeDot = function (index) {
    dotContainer.querySelectorAll(".dots__dot").forEach((dot) => {
      dot.classList.remove("dots__dot--active");
      dot.dataset.slide == index && dot.classList.add("dots__dot--active");
    });
  };
  const dots = function () {
    slides.forEach(function (_, index) {
      const st = `<button class="dots__dot" data-slide= "${index}"></button>`;
      dotContainer.insertAdjacentHTML("beforeend", st);
    });
  };

  // INIT TODO make a function.
  dots();
  mvSlides(currSlide);
  activeDot(currSlide);

  // ADD EVENT LISTENER
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    e.key === "ArrowLeft" && prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });
  dotContainer.addEventListener("click", function (e) {
    if (!e.target.classList.contains("dots__dot")) {
      return;
    }
    // Destructuring.
    // === slide = e.target.dataset.slide
    const { slide } = e.target.dataset;
    console.log(`slide`, slide);
    activeDot(slide);
    mvSlides(slide);
  });
};
slider();

///////////// LESSON //////////////////////////
//ROOT
/* console.log(document.documentElement);
console.log(document.body); */
const body = document.body;
// document's methods are also for all document children.
// return a Node list. Not updated when the element of this list change.
/* console.log(body.querySelectorAll(".section"));
 */ // Return an HTMLcollection. It is a so-called life collection.
/* console.log(body.getElementsByTagName("button"));
 */ // Return an HTML collection.
/* console.log(body.getElementsByClassName("section"));
 */
// Creating and inserting elements.

//body.insertAdjacentHTML('see bankist');

// Create a DOM element.
const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = "We use cookie to improve functionality."
message.innerHTML =
  "We use cookie to improve functionality.<button class='btn btn--close-cookie'>Got it!</button>";
// const header = document.querySelector(".header");
// Add the element as first child.
header.prepend(message);
// Add the element as last child.
//header.append(message);
// message could only be at one place at a time.
// get a copy of the element + all descendants (true)
/* 
  header.append(message.cloneNode(true));
  header.before(message);
  header.after(message); 
*/
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    // NEW method
    //message.remove();
    // before
    /* message.parentElement.removeChild(message); */
  });

// STYLES //
/* message.style.backgroundColor = "#3738dc";
 */ // FAIL in silent if the color is not correct.
/* console.log("message.style.backgrounldColor", message.style.backgroundColor);
 */ // GET CSS style
/* console.log(
  "getComputedStyle(message).height",
  getComputedStyle(message).height
); */
// HANDY !!
/* message.style.height =
  Number.parseInt(getComputedStyle(message).height) + 40 + "px"; */
// CSS variables
// ROOT
/* document.documentElement.style.setProperty("--color-primary", "orangered");
 */
// ATTRIBUTES //
/* const logo = document.getElementById("logo");
 */ // return absolute url
/* console.log("logo.src =>", logo.src); */
/* console.log("logo.alt =>", logo.alt);
 */
/* console.log("logo.className =>", logo.className);
 */ // Does not work with custom attributes.
/* console.log("logo.aria_label =>", logo.aria_label);
 */ // Other way to target these custom attributes
/* console.log(
  "logo.getAttribute('aria_label') =>",
  logo.getAttribute("aria_label")
); */
/* logo.setAttribute("role", "rgdp");
 */ // LIRE ARIA !!!!! LIRE DATA !!! FIGMA !!!
// return absolute url
/* console.log("logo.src =>", logo.src);
 */ // return relative url
/* console.log("logo.getAttribute('src') =>", logo.getAttribute("src"));
 */ // Datas attributes
// We have to transform dash to camelCase => data-version-number to dataset.versionNomber
/* console.log("logo.dataset.versionNumber =>", logo.dataset.versionNumber);
 */
// CLASSES
/* logo.classList.add("my-class", "my-other-class");
logo.classList.remove("my-class", "my-other-class");
logo.classList.toggle("my-class");
logo.classList.contains("my-class"); */
// Also . But override all other classes.
/* logo.className = "jonas"; */

// EVENTS //
/* const h1 = document.querySelector("h1");
const alertEvent = function (e) {
  alert("Mouse enter on H1");
  h1.removeEventListener("mouseenter", alertEvent);
};
h1.addEventListener("mouseenter", alertEvent); */
// Another way of attaching an event. DO NOT USE !!
/* h1.onmouseenter = function (e) {
  alert("On mouse enter H1");
}; */
// We could attach everywhere the removeEventListener()
/* setTimeout(() => h1.removeEventListener("mouseenter", alertEvent), 3000);
 */
// BUBBLING & CAPTURING
/* const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
document.querySelector(".nav__link").addEventListener("click", function (e) {
  //e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log(`LINK`, e.target, e.currentTarget);
  console.log(e.currentTarget === this);
  // Not a good idea.
  e.stopPropagation();
});
document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log(`LINK`, e.target, e.currentTarget);
  console.log(e.currentTarget === this);
});
document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log(`LINK`, e.target, e.currentTarget);
  console.log(e.currentTarget === this);
}); */
// This is happening during the bubbling phase.
// If you want an event to be trigger on the capturing phase, just add true as third parameter
// at the addEventListener method.
/* .addEventListener("click", function (e) {
  //e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log(`LINK`, e.target, e.currentTarget);
  console.log(e.currentTarget === this);
  // Not a good idea.
  e.stopPropagation();
}); */

// TRAVERSING DOM //
const h1 = document.querySelector("h1");
// Selecting childs
/* console.log(
  'h1.querySelectorAll("highlight") =>',
  h1.querySelectorAll("highlight")
); */
// Return all nodes including comments && text
/* console.log(h1.childNodes);
 */ // Return all elements in an HTML collection (which is live).
/* console.log(h1.children);
 */ h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "orangered";
/* h1.parentNode.style.backgroundColor = "palegreen";
 */
/* h1.parentElement.style.backgroundColor = "palegreen";
 */
// Get the first parent of the element.
/* h1.closest(".header").style.backgroundColor = "var(--color-primary)";
 */
/// Siblings (only one)
/* h1.previousElementSibling.style.backgroundColor = "var(--color-primary)";
 */
/* h1.nextElementSibling.style.backgroundColor = "var(--color-primary)";
 */ // All nodes including text.
/* h1.nextSibling.style.backgroundColor = "var(--color-primary)";
 */
/* h1.previousSibling.style.backgroundColor = "var(--color-primary)";
 */
// To get all siblings
/* const allSiblings = h1.parentElement.children;
 */
/// Return an HTML Collection.
/* console.log("allSiblings =>", allSiblings);
[...allSiblings].forEach((el) => {
  if (el !== h1) {
    el.style.backgroundColor = "orangered";
  }
}); */
/// DOM EVENTS ///
// page loaded (just html and javascript - not image and external)
document.addEventListener("DOMContentLoaded", function (e) {
  console.log(`DOMContentLoaded event`, e);
});
// We dont need to wrap our code in this eventListener
// because we load the script at the end of this page.

// DOM + images loaded
window.addEventListener("load", function (e) {
  console.log(`load event `, e);
});
// Before load
// Intrusive js.
window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  console.log(`before unload `, e);
  // For historical reasons a return is mandatory
  e.returnValue = "";
});
// Differents ways of loading a js script.
// defer && async => ignored in old browser. HTML 5 feature.
// async => script loaded in same time of the DOM but the executed is done after the load.
// USE WHEN SCRIPT EXEC ORDER IS NOT IMPORTANT (Google analytic for exemple).
// defer => script only executed et the end. GARANTY THE ORDER OF THE EXECUTION.
