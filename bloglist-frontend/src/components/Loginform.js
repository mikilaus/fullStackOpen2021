import React from "react";
import { Button, Form } from "react-bootstrap";

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
  <div>
    <h2>Log in to application</h2>

    <Form onSubmit={handleLogin}>
      <Form.Group>
        username
        <Form.Control
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </Form.Group>
      <div>
        password
        <Form.Control
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <Button id="login-button" type="submit" className="mt-3">
        login
      </Button>
    </Form>
  </div>
);

export default LoginForm;
