import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

export const Loading: React.FC = () => (
  <Row>
    <Col>
      <Spinner animation="border">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Col>
  </Row>
);
