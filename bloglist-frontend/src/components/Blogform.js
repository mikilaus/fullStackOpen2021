import React from "react";
import PropTypes from "prop-types";

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
    <form onSubmit={handleCreate}>
      <div>
        title:
        <input
          id="title"
          type="text"
          value={title}
          name="title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          id="author"
          type="text"
          value={author}
          name="author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          id="url"
          type="text"
          value={url}
          name="url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default Blogform;
