import React from "react";
import { render, screen } from "@testing-library/react";
import ReactDOM from "react-dom";
// import { act } from "react-dom/test-utils";
import App from "../App";

let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});
