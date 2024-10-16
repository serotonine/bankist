# BANKIST
### Repository
[https://github.com/serotonine/bankist ](https://github.com/serotonine/bankist)

### Page
[ https://serotonine.github.io/bankist/]( https://serotonine.github.io/bankist/)

***

### VanillaJS 
##### DOM
```js
const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
const clicked = e.target.closest("BUTTON");
```
```html
 <img src="./src/img/digital-lazy.jpg" data-src="./src/img/digital.jpg" alt="Computer" />  
```
```js
const  = entry.target.dataset.src;
```

##### Return all nodes including comments && text
```js
console.log(h1.childNodes);
```
##### Return all elements in an HTML collection (which is live).
```js
console.log(h1.children);
```
```js
h1.lastElementChild.style.color = "orangered";
h1.parentNode.style.backgroundColor = "palegreen";
h1.parentElement.style.backgroundColor = "palegreen";
```

##### Get the first parent of the element.
```js
h1.closest(".header").style.backgroundColor = "var(--color-primary)";
```
##### Siblings (only one)
```js
h1.previousElementSibling.style.backgroundColor = red;
h1.nextElementSibling.style.backgroundColor = blue;
```

##### All nodes including text.
```js
h1.nextSibling.style.backgroundColor = "var(--color-x)";
 
h1.previousSibling.style.backgroundColor = "var(--color-x)";
```
 
##### To get all siblings
```js
const allSiblings = h1.parentElement.children;
```
 
##### Return an HTML Collection.
```js
console.log("allSiblings =>", allSiblings);
[...allSiblings].forEach((el) => {
  if (el !== h1) {
    el.style.backgroundColor = "orangered";
  }
});
```


##### LOOP
```js
allSections.forEach((el) => el.classList.add("section--hidden"));
```

##### SMOOTH SCROLLING
##### Old school
```js
btn.addEventListener("click", function (e) {
    // Current scroll
    console.log(`Current scroll (X,Y)`, window.scrollX, window.scrollY);
    // Viewport width && height.
    console.log(
      `Viewport width && height`,
      document.documentElement.clientHeight,
      document.documentElement.clientWidth
    );
```
##### Nowadays
```js
btn.addEventListener("click", function (e) {
  body.scrollIntoView({ behavior: "smooth" });
});
```

#### BIND HACK
Workaround to the fact that event handler have just the event argument.<br>
For several arguments, pass an object or an array.
```js
nav.addEventListener("mouseover", setOpacity.bind(0.5));
```
#### INTERSECTION OBSERVER API
##### Old school - bad perf
```js
const initCoor = section1.getBoundingClientRect();
window.addEventListener("scroll", (e) => {
  if (this.scrollY >= initCoor.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});
```
##### Nowadays
```js
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
```
##### DESTRUCTURING
```js
// => const slide = e.target.dataset.slide
const { slide } = e.target.dataset;
```
##### ROOT
```js
const el =document.documentElement
const body = document.body;
document's methods are also for all document children.
// return a Node list. Not updated when the element of this list change.

const btns = body.getElementsByTagName("button");
const sections = body.getElementsByClassName("section");
```
##### Creating and inserting elements.
```js
body.insertAdjacentHTML('see bankist');
```
##### Create a DOM element.
```js
const message = document.createElement("div");
```
```js
message.textContent = "We use cookie to improve functionality."
```
```js
message.innerHTML =
  "We use cookie to improve functionality.<button class='btn btn--close-cookie'>Got it!</button>";
```
```js
// const header = document.querySelector(".header");
// Add the element as first child.
header.prepend(message);
// Add the element as last child.
//header.append(message);
// message could only be at one place at a time.
// get a copy of the element + all descendants (true)
header.append(message.cloneNode(true));
header.before(message);
header.after(message); 
```
##### Old school
```js
message.parentElement.removeChild(message); 
```
##### Nowadays
```js
message.remove();
```

#### GET CSS STYLE
```js
const n = getComputedStyle(message).height;
```
##### HANDY !!
```js
message.style.height =
  Number.parseInt(getComputedStyle(message).height) + 40 + "px";
  ```
### ATTRIBUTES
```js
const logo = document.getElementById("logo");
```
##### Return absolute url
```js
console.log("logo.src =>", logo.src); 
console.log("logo.alt =>", logo.alt);
console.log("logo.className =>", logo.className);
```
##### Does not work with custom attributes.
```js
console.log("logo.aria_label =>", logo.aria_label);
```
##### Other way to target these custom attributes
```js
console.log( logo.getAttribute("aria_label")); 
logo.setAttribute("role", "rgdp");
```
##### Return absolute url
```js
console.log(logo.src);
```
##### Return relative url
```js
console.log(logo.getAttribute("src"));
```
#### DATAS ATTRIBUTES
##### Transform dash to camelCase => data-version-number to dataset.versionNumber
```js
console.log(logo.dataset.versionNumber);
```
#### EVENTS

##### We could attach everywhere the removeEventListener()
```js
setTimeout(() => h1.removeEventListener("mouseenter", alertEvent), 3000);
```
##### BUBBLING & CAPTURING
```js
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
```
##### This is happening during the bubbling phase.
##### If you want an event to be trigger on the capturing phase, just add true as third parameter

```js
document.querySelector(".myDiv").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log(`LINK`, e.target, e.currentTarget);
  console.log(e.currentTarget === this);
});
```

#### DOM EVENTS
* ##### page loaded (just html and javascript - not image and external)<br>
```js
document.addEventListener("DOMContentLoaded", function (e) {
  console.log(`DOMContentLoaded event`, e);
});
```
* ##### DOM + images loaded
```js
window.addEventListener("load", function (e) {
  console.log(`load event `, e);
});
```
* ##### Before load (Intrusive js).
```js
window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  console.log(`before unload `, e);
  // For historical reasons a return is mandatory
  e.returnValue = "";
});
```
##### Differents ways of loading a js script.
* defer && async => ignored in old browser. HTML 5 feature.
  * async => script loaded in same time of the DOM but the executed is done after the load.<br> USE WHEN SCRIPT EXECUTION ORDER IS NOT IMPORTANT<br>(Google analytic for exemple).
  * defer => script only executed at the end. GARANTY THE ORDER OF THE EXECUTION.
