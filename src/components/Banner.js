import React from "react";
import "./css/Navbar.css";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function Banner() {
  return (
    <div>
      <Navbar className="navbar" bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/">Trailoholic</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/trails">Explore</Nav.Link>
            </Nav>

            <LinkContainer to="/">
              <Navbar.Brand></Navbar.Brand>
            </LinkContainer>
            <Nav>
              <LoginButton />
              <LogoutButton />
              <LinkContainer to="/signup">
                <Nav.Link>SignUp</Nav.Link>
              </LinkContainer>
              <NavDropdown title="My Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="/users/:userId/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/users/:userId/lists">
                  My List
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
