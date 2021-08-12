import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

function MainBlog({ blog }) {
  return (
    <ListGroup as="ul">
      <Link to={`/blogs/${blog.id}`}>
        <ListGroup.Item as="li">
          {blog.title} by {blog.author}
        </ListGroup.Item>
      </Link>
    </ListGroup>
  );
}

export default MainBlog;
