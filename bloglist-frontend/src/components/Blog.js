import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { initComments } from "../reducers/commentsReducer";

import commentService from "../services/comments";

const Blog = ({ blog, user }) => {
  const [newComment, setNewComment] = useState("");

  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);

  let commentsOfBlog = null;

  if (comments && blog) {
    commentsOfBlog = comments.filter((comment) => comment.blogId === blog.id);
  }

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    marginBottom: 5,
    marginTop: 10,
  };

  const deleteButtonStyle = {
    backgroundColor: "blue",
    color: "white",
    cursor: "pointer",
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const createNewComment = async (event) => {
    event.preventDefault();
    const commentToAdd = {
      content: newComment,
    };
    await commentService.create(commentToAdd, blog.id);
    dispatch(setNotification("New comment added!", "success", 5));
    dispatch(initComments());
    setNewComment("");
  };

  const handleLike = (likedBlog) => {
    dispatch(likeBlog(likedBlog));
    dispatch(setNotification(`You liked '${likedBlog.title}'`, "success", 5));
  };

  const handleRemove = (blogToRemove) => {
    dispatch(deleteBlog(blogToRemove.id));
  };

  if (!blog) {
    return null;
  }

  return (
    <div style={blogStyle} className="blog">
      <h3>
        {blog.title} {blog.author}
      </h3>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <p>
          Likes: {blog.likes}{" "}
          <span>
            <button id="like-button" onClick={() => handleLike(blog)}>
              Like
            </button>
          </span>
        </p>
        <p>{`Added by ${blog.user.name}`}</p>
        {user && user.username === blog.user.username && (
          <button style={deleteButtonStyle} onClick={() => handleRemove(blog)}>
            remove
          </button>
        )}
        <h4>comments:</h4>
        <form onSubmit={createNewComment}>
          <div>
            <input
              id="title"
              type="text"
              value={newComment}
              name="title"
              onChange={handleCommentChange}
            />
            <button type="submit">add comment</button>
          </div>
        </form>
        <ul>
          {commentsOfBlog &&
            commentsOfBlog.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
