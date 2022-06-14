import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-light p-3 text-center">
      <Container>
        <Row>
          <Col>Logo</Col>
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
