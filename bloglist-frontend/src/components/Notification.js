import React from "react";

const Notification = ({ message, type }) => {
  if (type === "error") {
    const errorStyle = {
      color: "red",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };
    return <div style={errorStyle}>{message}</div>;
  }
  if (type === "success") {
    const successStyle = {
      color: "green",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };
    return <div style={successStyle}>{message}</div>;
  }
  return null;
};

export default Notification;
