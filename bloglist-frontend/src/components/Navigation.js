import React from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { setUser } from "../reducers/userReducer";

function Navigation({ currentUser }) {
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedUser");
    dispatch(setUser(null));
  };

  return (
    <Navbar className="justify-content-center bg-primary">
      <Nav.Item>
        <Link to="/" className="mr-3 text-light">
          Blogs
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/users" className="text-light">
          Users
        </Link>
      </Nav.Item>
      {currentUser && (
        <>
          <Nav.Item className="ml-5 text-dark">
            {currentUser.name} logged in{" "}
          </Nav.Item>
          <Nav.Item>
            <Button
              variant="link"
              onClick={handleLogout}
              className="text-light"
            >
              Logout
            </Button>
          </Nav.Item>
        </>
      )}
    </Navbar>
  );
}

export default Navigation;
