import TrailsMap from "../pages/TrailsMap";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("Three navigation links are shown",async () => {
    render(<TrailsMap />,{wrapper:BrowserRouter});

    const buttonArray = screen.getAllByRole("button");
    expect(buttonArray).toHaveLength(4);
});
