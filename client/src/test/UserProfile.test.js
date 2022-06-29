import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserProfile from "../pages/UserProfile";

  
test("Three navigation links are shown",async () => {
    render(<UserProfile />,{wrapper:BrowserRouter});

    const cancleBtn = screen.getByRole('button', { name: /cancel/i })
    expect(cancleBtn).toBeInTheDocument()
    const saveBtn = screen.getByRole('button', { name: /save/i })
    expect(saveBtn).toBeInTheDocument()
    
});