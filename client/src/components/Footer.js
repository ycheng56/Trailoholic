import React from "react";
import { Row, Col } from "react-bootstrap";
import "./css/Navbar.css";
export default function Footer() {
  return (
    <footer className="bg-light p-1 text-center">
      <Row>
        <Col className="logo-column" xs={4} md={6} lg={6}>
          <img
            src={process.env.PUBLIC_URL + "/images/logo_3.png"}
            alt="logo"
            className="banner-logo"
          ></img>
        </Col>
        <Col className="footer-info" xs={8} md={6} lg={6}>
          <p>Copyright 2022 Trailaholic Brands, Inc.</p>

          <p>Privacy Policy Use of Cookies Legal</p>
        </Col>
      </Row>
    </footer>
  );
}
