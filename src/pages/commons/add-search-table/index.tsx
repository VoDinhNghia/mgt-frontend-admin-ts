import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { Button } from "@mui/material";
import { IpropAddAndSearchTable } from "../../../interfaces/common.interface";
import { BsPlusCircle } from "react-icons/bs";

const AddAndSearchTable = (props: IpropAddAndSearchTable) => {
  const { title } = props;

  return (
    <div className="mb-3 fs-6">
      <Row>
        <Col xl={3} className="text-center">
          <Card>
            <Card.Body>
              <Button
                variant="outlined"
                startIcon={<BsPlusCircle />}
                color="primary"
                className="w-100"
              >
                {title}
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={9}>
          <Card>
            <Card.Body>
              <Form.Control type="text" placeholder="Search by name" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddAndSearchTable;