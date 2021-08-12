import React from "react";
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

  const navStyle = {
    backgroundColor: "grey",
  };

  const userStyle = {
    display: "inline-block",
    marginLeft: 5,
  };

  return (
    <div style={navStyle}>
      <Link style={padding} to="/">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
      {currentUser && (
        <p style={userStyle}>
          {currentUser.name} logged in{" "}
          <span>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </span>
        </p>
      )}
    </div>
  );
}

export default Navigation;
