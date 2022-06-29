import SearchPage from "../pages/SearchPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, useParams } from "react-router-dom";


test("User List heading is shown",async () => {
    render(<SearchPage />,{wrapper:BrowserRouter});
    
    const title = screen.getByRole('heading')
    expect(title.textContent).toBe("Trails near ");

});