import Home from "../pages/Home";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("Heading is shown", async () => {
  render(<Home />, { wrapper: BrowserRouter });

  const firstHeading = screen.getByRole("heading", {
    name: /local favorites near vancouver/i,
  });
  expect(firstHeading).toBeInTheDocument();

  const secondHeading = screen.getByRole("heading", {
    name: /Best Hiking Trails/i,
  });
  expect(secondHeading).toBeInTheDocument();

  const thirdHeading = screen.getByRole("heading", {
    name: /Best Cycling Trails/i,
  });
  expect(thirdHeading).toBeInTheDocument();
});


test("Navbar links are shown", async () => {
    render(<Home />, { wrapper: BrowserRouter });
    const navLinkArray = screen.getAllByRole("link");
    expect(navLinkArray).toHaveLength(3);
  });
  