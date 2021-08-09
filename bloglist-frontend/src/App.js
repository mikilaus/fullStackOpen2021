import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { initBlogs } from "./reducers/blogReducer";
import { initUsers } from "./reducers/usersReducer";
import { setNotification } from "./reducers/notificationReducer";
import { setUser } from "./reducers/userReducer";

import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Loginform from "./components/Loginform";
import Togglable from "./components/Togglable";
import Blogform from "./components/Blogform";
import Users from "./components/Users";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const BlogformRef = useRef();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initUsers());
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
    console.log("logging in with", username, password);
  };
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedUser");
    dispatch(setUser(null));
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
    } catch (error) {
      console.log(error);
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

  return (
    <Router>
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
      {currentUser && (
        <p>
          {currentUser.username} logged in{" "}
          <span>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </span>
        </p>
      )}

      <Switch>
        <Route path="/users">
          <h2>Users</h2>
          <Users />
        </Route>
        <Route path="/">
          <Blogs user={currentUser} />
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
    </Router>
  );
};

export default App;
