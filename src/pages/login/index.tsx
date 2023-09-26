/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationManager } from "react-notifications";
import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./index.css";
import { IeventOnchangeInput } from "../../interfaces/common.interface";
import { fetchPermissions, login } from "../../services/auth.service";
import { routes } from "../../constants/constant";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [passWord, setPassword] = useState("");

  const loginAction = async (): Promise<void> => {
    const payload = {
      email,
      passWord,
    };
    const res = await login(payload);
    if (res?.statusCode === 200) {
      const user = res?.data;
      const profile = user?.profile;
      await fetchPermissions({ user: profile?._id });
      NotificationManager.success(res?.message, "Login", 4000);
      setTimeout(() => {
        window.location.href = routes.dashboard;
      }, 500);
    } else {
      NotificationManager.error(res?.message, "Login", 4000);
    }
  };

  return (
    <div className="LoginPage">
      <Row>
        <Col xl={6}>
          <img src="/images/loginIconLeft.png" className="ImgLoginPage" />
        </Col>
        <Col xl={6} className="p-4">
          <h3 className="text-center">Admin Dashboard</h3>
          <Form.Label className="mt-3">Email</Form.Label>
          <Form.Control
            type="email"
            onChange={(e: IeventOnchangeInput) => setEmail(e.target.value)}
          />
          <Form.Label className="mt-3">Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e: IeventOnchangeInput) => setPassword(e.target.value)}
          />
          <Button
            variant="outline-primary"
            className="mt-4 w-100 mb-3"
            onClick={() => loginAction()}
          >
            Login
          </Button>
          <a href="/" className="text-decoration-none text-muted">
            Forget password ?
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
