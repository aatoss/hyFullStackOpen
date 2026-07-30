import { useState, useEffect } from "react";
import { Routes, Route, useMatch, useNavigate } from "react-router-dom";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Navigation from "./components/Navigation";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const notificationHandler = (text, type) => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUser(user);
      setPassword("");
      setUsername("");
      navigate("/");
    } catch {
      notificationHandler("wrong username or password", "error");
    }
  };

  const handleLogout = () => {
    try {
      setUser(null);
      blogService.setToken(null);
      window.localStorage.removeItem("loggedInUser");
      navigate("/");
    } catch {
      notificationHandler("error logging out", "error");
    }

  };

  const handleNewBlogSubmit = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      const blogToAdd = { ...returnedBlog, user };
      setBlogs(blogs.concat(blogToAdd));
      notificationHandler(`A new blog ${blogObject.title} by ${blogObject.author} added`, "success");
      navigate("/");
    } catch {
      notificationHandler("error creating blog", "error");
    }

  };

  const handleBlogLike = async (id, updatedBlog) => {
    try {
      const likedBlog = await blogService.update(id, updatedBlog);
      setBlogs(
        blogs.map((blog) => (blog.id === id ? { ...likedBlog, user: blog.user } : blog)),
      );
    } catch {
      notificationHandler("error liking blog", "error");
    }

  };

  const handleDeleteBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      notificationHandler(`Blog ${blog.title} by ${blog.author} deleted`, "warning");
      navigate("/")
    } catch {
      notificationHandler('error deleting blog', 'error')
    }
  };

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

  return (
    <div>
      <Navigation user={user} handleLogout={handleLogout} />
      <Notification message={notification} />
      <Routes>
        <Route
          path="/"
          element={
            <BlogList blogs={blogs} handleBlogLike={handleBlogLike} handleDeleteBlog={handleDeleteBlog} user={user} />
          }
        />
        <Route path="/login" element={<LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} notification={notificationHandler} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blog}
              user={user}
              handleDeleteBlog={handleDeleteBlog}
              handleBlogLike={handleBlogLike}
            />
          }
        />
        <Route
          path="/create"
          element={<BlogForm handleNewBlogSubmit={handleNewBlogSubmit} />}
        />
      </Routes>
    </div>
  );
};

export default App;
