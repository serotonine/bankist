"use strict";

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2,
  pin: 11,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account2 = {
  owner: "Jessica Parker",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 22,

  movementsDates: [
    "2023-11-20T13:15:33.035Z",
    "2023-11-18T09:48:16.867Z",
    "2023-11-15T06:04:23.907Z",
    "2023-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2023-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Roberto Cavales",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 33,
  movementsDates: [
    "2023-11-20T13:15:33.035Z",
    "2023-11-18T09:48:16.867Z",
    "2023-11-15T06:04:23.907Z",
    "2023-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2023-07-26T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "fr-BE",
};

const account4 = {
  owner: "Brigitte Hopla",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 44,
  movementsDates: [
    "2023-11-20T13:15:33.035Z",
    "2023-11-18T09:48:16.867Z",
    "2023-11-15T06:04:23.907Z",
    "2023-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
  ],
  currency: "EUR",
  locale: "nl-BE",
};

let datas = localStorage.getItem("bankist");
if (!datas) {
  const _accounts = JSON.stringify([account1, account2, account3, account4]);
  localStorage.setItem("bankist", _accounts);
}
