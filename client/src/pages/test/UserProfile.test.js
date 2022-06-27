import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserProfile from "../UserProfile";
import fetchUserDescription from "../UserProfile"

global.fetch = jest.fn((data)=>{
    Promise.resolve({
        json:()=>Promise.resolve({data:{avatar_name:"cynthia_cheng",description:"I love hiking!"}})
    })
})
// const testUser =({
//     avatar_name:"cynthia_cheng",
//     description:"I like cycling!!! And Hiking!",
//     list:[],
// })
beforeEach(() => {
    fetch.mockClear();
  });
test("Three navigation links are shown",async () => {
    render(<UserProfile />,{wrapper:BrowserRouter});

    const cancleBtn = screen.getByRole('button', { name: /cancel/i })
    expect(cancleBtn).toBeInTheDocument()
    const saveBtn = screen.getByRole('button', { name: /save/i })
    expect(saveBtn).toBeInTheDocument()

    // const userName=await fetchUserDescription();
    // expect(userName).toEqual("I love hiking!");
});