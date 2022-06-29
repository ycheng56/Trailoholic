import AddTrail from "../pages/AddTrail";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

test("The select box is shown", async () => {
  render(<AddTrail />, { wrapper: BrowserRouter });

  const typeSelect = screen.getByRole("combobox", {
    name: /select trail type/i,
  });
  expect(typeSelect).toBeInTheDocument();

  const difficultySelect = screen.getByRole("combobox", {
    name: /select trail difficulty/i,
  });
  expect(difficultySelect).toBeInTheDocument();
});

test("Add Trail button is shown", async () => {
  render(<AddTrail />, { wrapper: BrowserRouter });

  const addTrailBtn = screen.getByRole("button", {
    name: /find trail/i,
  });
  expect(addTrailBtn).toBeInTheDocument();
});

