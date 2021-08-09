import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

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

  const handleLike = (likedBlog) => {
    dispatch(likeBlog(likedBlog));
    dispatch(setNotification(`You liked '${likedBlog.title}'`, "success", 5));
  };

  const handleRemove = (blogToRemove) => {
    dispatch(deleteBlog(blogToRemove.id));
  };

  return (
    <div style={blogStyle} className="blog">
      <p>
        {blog.title}
        {blog.author}{" "}
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
          {user && user.username === blog.user.username && (
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
