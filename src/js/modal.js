// MODAL WINDOW //
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const modalForm = document.querySelector(".modal__form");

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

/// SEND DATAS ///
const itemForm = document.querySelector(".modal__item--form");
const itemResponse = document.querySelector(".modal__item--response");

// Set Owner.
const fixName = function (name) {
  // First set all in lower case.
  const lc = name.toLowerCase().trim();
  const capitalizeName = lc[0].toUpperCase() + lc.slice(1);
  return capitalizeName;
};
const setOwner = function (first, last) {
  return `${fixName(first)} ${fixName(last)}`;
};
const setPin = function () {
  return Math.round(Math.random() * 1000);
};
const setNow = function () {
  const now = new Date();
  return now.toISOString();
};

modalForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const formData = Object.fromEntries(new FormData(evt.target));
  console.log(formData);
  const user = {
    owner: setOwner(formData.first, formData.last),
    movements: [formData.deposit],
    interestRate: 1.5,
    pin: setPin(),
    movementsDates: [setNow()],
    currency: formData.currency,
    locale: "fr-BE",
  };
  const datas = JSON.parse(localStorage.getItem("bankist"));
  datas.push(user);
  localStorage.setItem("bankist", JSON.stringify(datas));
  // Reset form;
  modalForm.reset();
  // Display response mess.
  itemResponse.classList.add("active");
  itemForm.classList.add("submitted");
});
