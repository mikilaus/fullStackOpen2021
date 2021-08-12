import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { initBlogs } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import { setUser } from "./reducers/userReducer";
import { initUsers } from "./reducers/usersReducer";
import { initComments } from "./reducers/commentsReducer";

import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Loginform from "./components/Loginform";
import Togglable from "./components/Togglable";
import Blogform from "./components/Blogform";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import Navigation from "./components/Navigation";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const BlogformRef = useRef();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initUsers());
    dispatch(initComments());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(loggedUser));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const actualUser = await loginService.login({
        username,
        password,
      });
      blogService.setToken(actualUser.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(actualUser));
      dispatch(setUser(actualUser));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("wrong username or password", "error", 5));
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      blogService.setToken(currentUser.token);
      const addedBlog = await blogService.create(newBlog);
      dispatch(initBlogs());
      BlogformRef.current.toggleVisibility();
      dispatch(
        setNotification(
          `a new blog ${addedBlog.title} by ${addedBlog.author} added`,
          "success",
          5
        )
      );
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      dispatch(setNotification("Token missing", "error", 5));
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const userMatch = useRouteMatch("/users/:id");
  const blogMatch = useRouteMatch("/blogs/:id");

  let clickedUser;
  let clickedBlog;

  if (users) {
    clickedUser = userMatch
      ? users.find((user) => user.id === userMatch.params.id)
      : null;
  }

  if (blogs) {
    clickedBlog = blogMatch
      ? blogs.find((blog) => blog.id === blogMatch.params.id)
      : null;
  }

  return (
    <div>
      <Navigation currentUser={currentUser} />
      <h1>Blogs</h1>
      <Notification />
      {!currentUser && (
        <Togglable buttonLabel="log in">
          <Loginform
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
          />
        </Togglable>
      )}

      <Switch>
        <Route path="/users/:id">
          <User user={clickedUser} />
        </Route>
        <Route path="/blogs/:id">
          <Blog user={currentUser} blog={clickedBlog} />
        </Route>
        <Route path="/users">
          <h2>Users</h2>
          <Users users={users} />
        </Route>
        <Route path="/">
          <Blogs />
          {currentUser && (
            <>
              <h2>Create a new blog</h2>
              <Togglable buttonLabel="add blog" ref={BlogformRef}>
                <Blogform
                  title={title}
                  author={author}
                  url={url}
                  handleCreate={handleCreate}
                  handleTitleChange={handleTitleChange}
                  handleAuthorChange={handleAuthorChange}
                  handleUrlChange={handleUrlChange}
                />
              </Togglable>
            </>
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
