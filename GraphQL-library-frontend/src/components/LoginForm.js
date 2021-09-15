import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries/queries";

const LoginForm = ({ setToken, show, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: () => {
      setPage("authors");
    },
  });

  useEffect(() => {
    console.log(result);
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("Bookapp-token", token);
    }
  }, [result.data]); // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };

  if (show) {
    return (
      <div>
        <form onSubmit={submit}>
          <div>
            username{" "}
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password{" "}
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return null;
};

export default LoginForm;
