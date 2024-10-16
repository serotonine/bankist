"use strict";

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
const selectTransferTo = document.querySelector(".form__select--to");

/////////////////////////////////////////////////

// See localStorage.js
let accounts = JSON.parse(datas);
// Current account.
let currentAccount = {};
let timer;

/////////////////////////////////////////////////

//empty movements container
containerMovements.innerHTML = "";

// UPDATE LOCAL STORAGE //
const updateLocalStorage = function(){
  localStorage.setItem('bankist', JSON.stringify(accounts));
}

// DISPLAY DATE //
const displayDate = function (acc, d, hm = false) {
  const l = acc.locale;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  if (hm) {
    options.hour = "numeric";
    options.minute = "numeric";
  }

  return new Intl.DateTimeFormat(l, options).format(d);
  // Before Intl API
  const addZ = (d) => `${d}`.padStart(2, 0);
  const currentDay = addZ(d.getDate());
  const currentMonth = addZ(d.getMonth() + 1);
  const currentMinute = addZ(d.getMinutes());
  const currenHour = addZ(d.getHours());
  const output = hm
    ? `${currentDay}/${currentMonth}/${d.getFullYear()}, ${currenHour}:${currentMinute}`
    : `${currentDay}/${currentMonth}/${d.getFullYear()} `;
};
const howManyDays = (acc, date) => {
  const now = new Date();
  // Convert to nb of days : 1000 milliseconds  * seconds * minutes * hours.
  // Try moment.js for more complicated operations.
  const howMany = Math.round(Math.abs(date - now) / (1000 * 60 * 60 * 24));
  if (howMany === 0) {
    return "today";
  } else if (howMany === 1) {
    return "yesterday";
  } else if (howMany <= 7) {
    return `${howMany} days ago`;
  }
  return displayDate(acc, date);
};
/// CURRENCY Intl ///
const intlNb = (account, num) => {
  const options = {
    style: "currency",
    currency: account.currency,
  };
  return new Intl.NumberFormat(account.locale, options).format(num);
};

/// DISPLAY MVT FCT ///
const displayMvt = function (acc, sort = false) {
  // Reset container.
  containerMovements.innerHTML = "";
  const mouvements = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  mouvements.forEach(function (value, index) {
    const type = value > 0 ? "deposit" : "withdrawal";
    const html = `<div class="movements__row">
<div class="movements__type movements__type--${type}">${index} ${type}</div>
<div class="movements__date">${howManyDays(
      acc,
      new Date(acc.movementsDates[index])
    )}</div>
<div class="movements__value">${intlNb(acc, value)}</div>
</div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// Create a property 'username' on each account.
const createUserName = function (accounts = []) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((value) => value.at(0))
      .join("");
  });
};
// Store the current balance on each accounts.
const createUserBalance = function (accounts) {
  accounts.forEach((acc) => {
    const balance = acc.movements.reduce((acc, value) => acc + value, 0);
    acc.balance = balance;
  });
};
// Out In Interest methods.
const displayDeposit = function (account) {
  const deposit = account.movements
    .filter((value) => value > 0)
    .reduce((acc, value) => acc + value, 0)
    .toFixed(2);
  labelSumIn.textContent = `${intlNb(account, deposit)}`;
};
const displayWithdrawal = function (account) {
  const withdrawal = Math.abs(
    account.movements
      .filter((value) => value < 0)
      .reduce((acc, value) => acc + value, 0)
  );
  labelSumOut.textContent = `${intlNb(account, withdrawal)}`;
};
const displayInterest = function (account) {
  const totalInterest = account.movements
    .filter((value) => value > 0)
    .reduce((acc, value) => acc + (value * account.interestRate) / 100, 0)
    .toFixed(2);
  labelSumInterest.textContent = `${intlNb(account, totalInterest)}`;
};
const displaySummary = function (currentAccount) {
  displayMvt(currentAccount);
  displayDeposit(currentAccount);
  displayWithdrawal(currentAccount);
  displayInterest(currentAccount);
  getBalance(currentAccount);
};
// Sum of the movements.
const getBalance = function (account) {
  const balance = account.movements.reduce((acc, value) => acc + value, 0);
  const options = {
    style: "currency",
    currency: account.currency,
  };
  labelBalance.textContent = `${intlNb(account, balance)}`;
};
////// LET'S PLAY ////
// Init accounts other properties.
createUserName(accounts);
createUserBalance(accounts);
//Populate form__select--to
const options = accounts.map(
  (acc) => `<option value="${acc.username}">${acc.owner}</option>`
);
selectTransferTo.insertAdjacentHTML("beforeend", options.join("\n"));

// Log out timer //
const startLogOutTimer = function () {
  // Set time (seconds).
  let t = 1800;
  // Call the timer every second.
  const timer = setInterval(function () {
    const min = `${Math.trunc(t / 60)}`.padStart(2, 0);
    const sec = `${Math.trunc(t % 60)}`.padStart(2, 0);
    // In each call print the remaining time.
    labelTimer.textContent = `${min}:${sec}`;
    if (t === 0) {
      // When 0 seconds stop timer and log out
      clearInterval(timer);
      containerApp.removeAttribute("style");
      labelWelcome.textContent = "Log in to get started.";
    }
    t--;
  }, 1000);

  return timer;
};
// USER LOGGIN //
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner
      .split(" ")
      .at(0)}`;
    // Display main
    containerApp.style.opacity = 100;
    // Clear input logins.
    inputLoginPin.value = inputLoginUsername.value = "";
    // Lose focus.
    inputLoginPin.blur();
    // if a timer is runing, kill it
    if (timer) {
      clearInterval(timer);
    }
    // Start log out timer
    timer = startLogOutTimer();
    // Display Date on header.
    labelDate.textContent = displayDate(currentAccount, new Date(), true);
    // Display Money.
    displaySummary(currentAccount);
  } else {
    console.error("Wrong identifiants!!!");
  }
});
// Transfert money.
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === selectTransferTo.value
  );

  if (
    receiverAcc &&
    receiverAcc.owner !== currentAccount.owner &&
    amount > 0 &&
    amount <= currentAccount.balance
  ) {
    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
    //
    console.log(`Transfert ready to be executed.`);
    // retrieve transfered amount from currentAccount.movements,
    // set currentAccount withdrawal.
    const now = new Date();
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(now.toISOString());
    // Add amount to receiver account.
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(now.toISOString());
    // Reset input.
    inputTransferAmount.value = selectTransferTo.value = "";
    // Display withdrawal.
    displaySummary(currentAccount);
    // Update localStorage;
    updateLocalStorage();
  } else {
    console.error("Check your command something is wrong");
  }
});

// Request loan.
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputLoanAmount.value;
  if (
    amount > 0 &&
    currentAccount.movements.some((deposit) => deposit >= amount * 0.1)
  ) {
    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
    //
    console.log(`Deposit granted ${amount * 0.1}.`);
    currentAccount.movements.push(amount);
    //Push date
    const now = new Date();
    currentAccount.movementsDates.push(now.toISOString());
    inputLoanAmount.value = "";
    // Update localStorage
    updateLocalStorage();
    // setTimeout(callback function, delay, callback function arguments).
    setTimeout(displaySummary, 200, currentAccount);
  } else {
    console.log(`Deposit not granted : no deposit >= ${amount * 0.1}.`);
  }
});

// Close account.
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    console.log(`Ok for delete account`);
    const index = accounts.findIndex(function (acc) {
      return acc.username === inputCloseUsername.value;
    });
    labelWelcome.textContent = `Bye bye, ${currentAccount.owner
      .split(" ")
      .at(0)}`;
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    // Update localStorage
    updateLocalStorage();
  } else {
    console.error(`Wrong username or wrong pin.`);
  }
});

// Sorting.
let isSorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  isSorted = !isSorted;
  displayMvt(currentAccount, isSorted);
});

// Array.from show case.
labelBalance.addEventListener("click", function () {
  // get array from NodeList. Then iterate it (callBack function).
  const movUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (el, i) => +el.textContent.replace("€", "")
  );
});
