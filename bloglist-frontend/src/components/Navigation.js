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

  const padding = {
    padding: 5,
  };

  return (
    <Navbar className="justify-content-center bg-info">
      <Nav.Item>
        <Link style={padding} to="/">
          Blogs
        </Link>
      </Nav.Item>
      <Link style={padding} to="/users">
        Users
      </Link>
      {currentUser && (
        <>
          <Nav.Item className="ml-5">{currentUser.name} logged in </Nav.Item>
          <Nav.Item>
            <Button variant="link" onClick={handleLogout}>
              Logout
            </Button>
          </Nav.Item>
        </>
      )}
    </Navbar>
  );
}

export default Navigation;
