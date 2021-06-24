import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Loginform from "./components/Loginform";
import Togglable from "./components/Togglable";
import Blogform from "./components/Blogform";

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

  const BlogformRef = useRef();

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
      blogService.setToken(user.token);
      const addedBlog = await blogService.create(newBlog);
      const newBlogList = await blogService.getAll();
      BlogformRef.current.toggleVisibility();
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
  const handleLike = async (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    try {
      await blogService.update(updatedBlog, blog.id);
      const newBlogList = await blogService.getAll();
      setBlogs(newBlogList);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog '${blog.title}'`)) {
      try {
        blogService.setToken(user.token);
        await blogService.remove(blog.id);
        const newBlogList = await blogService.getAll();
        setBlogs(newBlogList);
      } catch (error) {
        console.log(error);
      }
    }
  };
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
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={notificationMessage} type={notificationType} />
        <Togglable buttonLabel="log in">
          <Loginform
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
          />
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} handleLike={handleLike} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notificationMessage} type={notificationType} />
      <p>
        {user.username} logged in{" "}
        <span>
          <button onClick={handleLogout}>Logout</button>
        </span>
      </p>
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
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          user={user}
          blogUserName={blog.user.username}
        />
      ))}
    </div>
  );
};

export default App;
