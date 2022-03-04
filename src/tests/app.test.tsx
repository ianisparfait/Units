import React from "react";
import { render, screen } from "@testing-library/react";
import ReactDOM from "react-dom";
import { renderHook, act } from "@testing-library/react-hooks";
import App from "../App";

let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

test("substraction", () => {
  const { result } = renderHook(() => TestLogin);
  const { TestLogin } = result.current;
  act(() => {TestLogin('regular@example.fr', 'password')});
  const { result: resultText } = result.current;
  expect(resultText).toEqual('2');
});