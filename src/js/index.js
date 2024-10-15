"use strict";

// SECTIONS
const allSections = document.querySelectorAll(".section");
allSections.forEach((el) => el.classList.add("section--hidden"));

// SMOOTH SCROLLING //

// Btn "Learn More."
const section1 = document.getElementById("section--1");
document
  .querySelector(".btn--scroll-to")
  .addEventListener("click", function (e) {
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

// BACK TO TOP.
const backToTop = document.getElementById("back-to-top");
const [body] = document.getElementsByTagName("BODY");
backToTop.addEventListener("click", function (e) {
  body.scrollIntoView({ behavior: "smooth" });
});

//// NAVIGATION ////
// NAVIGATION SMOOTH SCROLLING
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__links");
const navLink = document.querySelector(".nav__link");

// Use bubbling event: Add event listener to commun parent.
navLinks.addEventListener("click", function (e) {
  if (!e.target.classList.contains("btn--bank")) {
    e.preventDefault();
    if (e.target.tagName === "A") {
      const id = e.target.getAttribute("href");
      const target = document.getElementById(id);
      target.scrollIntoView({ behavior: "smooth" });
    }
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
// Work around to the fact that event handler have just 1 argument (the event).
// For several arguments, pass an object or an array.
nav.addEventListener("mouseover", setOpacity.bind(0.5));
nav.addEventListener("mouseout", setOpacity.bind(1));

// STICKY NAVIGATION
// Better: using the NEW Intersection Observer API than
// window.addEventListener("scroll", callback fct).
const header = document.querySelector(".header");

const stickyNav = function (entries) {
  // Get the first el of the array.
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
    backToTop.classList.remove("hidden");
  } else {
    nav.classList.remove("sticky");
    backToTop.classList.add("hidden");
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
