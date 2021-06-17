import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Loginform from "./components/Loginform";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setNotification("wrong username or password", "error");
    }
    console.log("logging in with", username, password);
  };
  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };
  const handleCreate = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      await blogService.setToken(user.token);
      const addedBlog = await blogService.create(newBlog);
      const newBlogList = await blogService.getAll();
      setNotification(
        `a new blog ${addedBlog.title} by ${addedBlog.author} added`,
        "success"
      );
      setBlogs(newBlogList);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      console.log(error);
    }
  };
  const blogForm = () => (
    <form onSubmit={handleCreate}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
  const setNotification = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotificationMessage("");
      setNotificationType("");
    }, 3000);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={notificationMessage} type={notificationType} />
        {!loginVisible && (
          <button onClick={() => setLoginVisible(true)}>log in</button>
        )}
        {loginVisible && (
          <div>
            <Loginform
              username={username}
              password={password}
              handleLogin={handleLogin}
              handleUsernameChange={handleUsernameChange}
              handlePasswordChange={handlePasswordChange}
            />
            <button onClick={() => setLoginVisible(false)}>Cancel</button>
          </div>
        )}

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <p>
        {user.username} logged in{" "}
        <span>
          <button onClick={handleLogout}>Logout</button>
        </span>
      </p>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
