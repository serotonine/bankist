"use strict";

// Calculate slider height
const maxHeight = function (slides) {
  let h = 0;
  slides.forEach((slide) => {
    h = slide.offsetHeight > h ? slide.offsetHeight : h;
  });
  return h;
};

// SLIDER
const slider = function () {
  // DOM
  const slider = document.querySelector(".slider");
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
  slider.style.height = `${maxHeight(slides) * 1.1}px`;
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

  // INIT
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
    activeDot(slide);
    mvSlides(slide);
  });
};
slider();
