import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

const Blogform = ({
  title,
  author,
  url,
  handleCreate,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
}) => {
  Blogform.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    handleCreate: PropTypes.func.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    handleAuthorChange: PropTypes.func.isRequired,
    handleUrlChange: PropTypes.func.isRequired,
  };

  return (
    <Form onSubmit={handleCreate}>
      <Form.Group className="mb-3">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          id="title"
          type="text"
          value={title}
          name="title"
          onChange={handleTitleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Author:</Form.Label>
        <Form.Control
          id="author"
          type="text"
          value={author}
          name="author"
          onChange={handleAuthorChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Url:</Form.Label>
        <Form.Control
          id="url"
          type="text"
          value={url}
          name="url"
          onChange={handleUrlChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default Blogform;
