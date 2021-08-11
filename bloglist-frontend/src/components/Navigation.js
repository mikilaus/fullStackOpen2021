import React from "react";

import { Link } from "react-router-dom";

function Navigation({ currentUser, handleLogout }) {
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
