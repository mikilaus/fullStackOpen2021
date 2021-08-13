import React, { useState } from "react";

import { Button, Container, Form } from "react-bootstrap";

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
    return <p>No blog to see</p>;
  }

  return (
    <Container className="col-12">
      <h3 className="mt-5">
        {blog.title} by {blog.author}
      </h3>
      <div>
        <a href={blog.url} className="mt-3" target="_blank" rel="noreferrer">
          {blog.url}
        </a>
        <p className="mt-3">{`Added by ${blog.user.name}`}</p>
        <p className="mt-3">
          Likes: {blog.likes}{" "}
          <span>
            <Button
              id="like-button"
              onClick={() => handleLike(blog)}
              className="btn-sm"
            >
              Like
            </Button>
          </span>
        </p>

        {user && user.username === blog.user.username && (
          <Button variant="danger" size="sm" onClick={() => handleRemove(blog)}>
            remove
          </Button>
        )}
        <h4 className="mt-5 mb-4">Comments:</h4>
        <Form onSubmit={createNewComment} className="mb-3">
          <Form.Group>
            <Form.Control
              id="title"
              type="text"
              value={newComment}
              name="title"
              onChange={handleCommentChange}
            />
            <Button type="submit" className="btn-sm mt-1">
              add comment
            </Button>
          </Form.Group>
        </Form>
        <ul>
          {commentsOfBlog &&
            commentsOfBlog.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
        </ul>
      </div>
    </Container>
  );
};

export default Blog;
