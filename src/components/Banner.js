import React from "react";
import "./css/Navbar.css";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useAuth0 } from "@auth0/auth0-react";
import AuthenticationButton from './AuthenticationButton';

export default function Banner() {
  const { isAuthenticated, logout } = useAuth0();
  return (
    <div>
      <Navbar className="navbar" bg="light" expand="lg" sticky="top">
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
              {isAuthenticated && (
                <NavDropdown title="My Account" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/user/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/user/lists">
                    My List
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
                </NavDropdown>
              )}

              {!isAuthenticated && (
                <div className="navbar-nav ml-auto">
                <AuthenticationButton />
              </div>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
