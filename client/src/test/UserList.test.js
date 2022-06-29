import UserLists from "../pages/UserLists";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";


test("User List heading is shown",async () => {
    render(<UserLists />,{wrapper:BrowserRouter});

    const title = screen.getByRole('heading')
    expect(title.textContent).toBe("❤ My Favorite Trails");

});