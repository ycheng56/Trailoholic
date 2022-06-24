import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./css/Navbar.css";
export default function Footer() {
  return (
    <footer className="bg-light p-3 text-center">
      <Container>
        <Row>
          <Col>
          <img src={process.env.PUBLIC_URL + "/images/logo_3.png"} alt="logo" className="banner-logo"></img>
          </Col>
        </Row>
        <Row>
          <Col>Copyright 2022 Trailaholic Brands, Inc.</Col>
        </Row>
        <Row>
          <Col>Privacy Policy Use of Cookies Legal</Col>
        </Row>
      </Container>
    </footer>
  );
}
