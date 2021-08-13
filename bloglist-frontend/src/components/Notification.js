import React from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const Notification = () => {
  const notificationState = useSelector((state) => state.notification);

  if (notificationState) {
    const { message, type } = notificationState;

    if (type === "error") {
      return <Alert variant="danger">{message}</Alert>;
    }
    if (type === "success") {
      return <Alert variant="success">{message}</Alert>;
    }
  }

  return null;
};

export default Notification;
