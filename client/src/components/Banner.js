import React from "react";
import "./css/Navbar.css";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useAuth0 } from "@auth0/auth0-react";
import AuthenticationButton from './AuthenticationButton';
import { Link } from "react-router-dom";

export default function Banner() {
  const { isAuthenticated, logout } = useAuth0();
  return (
    <div>
      <Navbar className="navbar" bg="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand aria-label="home page" href="/">Trailoholic</Navbar.Brand>
          <img to="/" aria-label="home page" src={process.env.PUBLIC_URL + "/images/logo_1.png"} alt="logo" className="banner-logo"></img>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/trails/map">Explore</Nav.Link>
              <Nav.Link as={Link} to="/addtrail">Add Trail</Nav.Link>
            </Nav>
                        
            <Nav>
              {isAuthenticated && (
                <NavDropdown aria-label="User Account" title="My Account" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/user/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/user/lists">
                    My List
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              <div className="navbar-nav ml-auto">
                <AuthenticationButton />
              </div>


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
