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
    <Navbar className="justify-content-center bg-info">
      <Nav.Item>
        <Link to="/" className="mr-3">
          Blogs
        </Link>
      </Nav.Item>
      <Link to="/users">Users</Link>
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
