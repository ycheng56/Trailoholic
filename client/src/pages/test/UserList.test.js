import UserLists from "../UserLists";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";


test("Three navigation links are shown",async () => {
    render(<UserLists />,{wrapper:BrowserRouter});

    const title = screen.getByRole('heading')
    expect(title.textContent).toBe("❤ My Favorite Trails");

    // const userName=await fetchUserDescription();
    // expect(userName).toEqual("I love hiking!");
});