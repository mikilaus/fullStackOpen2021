import React, { useState } from "react";

const Blog = ({ blog, handleLike, handleRemove, user, blogUserName }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 2,
    marginBottom: 5,
    marginTop: 10,
  };

  const deleteButtonStyle = {
    backgroundColor: "blue",
    color: "white",
    cursor: "pointer",
  };

  return (
    <div style={blogStyle} className="blog">
      <p>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setVisible(!visible)}>
          {!visible ? "view" : "hide"}
        </button>
      </p>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            Likes: {blog.likes}{" "}
            <span>
              <button id="like-button" onClick={() => handleLike(blog)}>
                Like
              </button>
            </span>
          </p>
          <p>{blog.user.name}</p>
          {user && user.username === blogUserName && (
            <button
              style={deleteButtonStyle}
              onClick={() => handleRemove(blog)}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
