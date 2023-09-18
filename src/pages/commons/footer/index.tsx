import React from "react";
import { Row, Col } from "react-bootstrap";

const FooterPage = () => {
  return (
    <div>
      <div className="bg-primary mt-2 p-3 text-white text-center fs-6">
        <Row>
          <Col xl={4}>
            <p>About us</p>
          </Col>
          <Col xl={4}>
            <p>Services</p>
          </Col>
          <Col xl={4}>
            <p>Contact</p>
          </Col>
        </Row>
      </div>
      <div className="text-center p-3 bg-light fs-6">@Copyright 2023</div>
    </div>
  );
};

export default FooterPage;
