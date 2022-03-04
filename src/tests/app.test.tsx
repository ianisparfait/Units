import React from "react";
import { render, screen } from "@testing-library/react";
import ReactDOM from "react-dom";
import { renderHook, act } from "@testing-library/react-hooks";
import App from "../App";

const classApp = new App({})

let container: any;

const testAddToCart = {
  id: 'Abajour',
  meuble: {
    id: "d680gkfik5gkyyhdxlq",
    meubleInfo: "",
    meubleName: "Abajour",
    meublePrix: "37.38",
    meubleShortInfo: "Pratique pour poser des trucs",
    meubleStock: "89",
    meubleType: ""
  },
  amount: 1
};
const testAddProduct = {
  meubleInfo: "description longue",
  meubleName: "test",
  meublePrix: "1",
  meubleShortInfo: "description courte",
  meubleStock: "12",
  meubleType: "test type",
};

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

test("add to cart", () => {
  expect(classApp.addToCart(testAddToCart)).toEqual(true);
});

test("remove from cart", () => {
  expect(classApp.removeFromCart("test")).toEqual(true);
});

test("add product", () => {
  expect(classApp.addMeuble(testAddProduct)).toEqual(true);
});


test('API Open Weather', () => {
  return classApp.callOpenWeather("https://api.openweathermap.org/data/2.5/forecast?lat=43.529743&lon=5.447427&appid=ef571cfdaab632e707a801b1e2d336e5&lang=fr&units=metric").then(data => {
    expect(data).toBe(true);
  });
});