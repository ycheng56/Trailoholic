import TrailDetails from "../pages/TrailDetails";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";


test("Trail Detail Page Navigation Bar is shown", async () => {
    render(<TrailDetails />, { wrapper: BrowserRouter });
    const navLinkArray = screen.getAllByRole("link");
    expect(navLinkArray).toHaveLength(5);
  });

  
test("Trail Detail Link is shown", async () => {
    render(<TrailDetails />, { wrapper: BrowserRouter });
    const trailDetailLink = screen.getByRole('heading', {
        name: /trail detail/i
      })
      expect(trailDetailLink).toBeInTheDocument();

      const trailInstructionLink = screen.getByRole('heading', {
        name: /instruction/i
      })
      expect(trailInstructionLink).toBeInTheDocument();

      const locationLink = screen.getByRole('heading', {
        name: /location/i
      })
      expect(locationLink).toBeInTheDocument();

      const trailReviewLink = screen.getByRole('heading', {
        name: /Reviews/i
      })
      expect(trailReviewLink).toBeInTheDocument();
      const nearbyLink = screen.getByRole('heading', {
        name: /What's Nearby/i
      })
      expect(nearbyLink).toBeInTheDocument();
  });

  