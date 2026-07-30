import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Blog from "./Blog";

const BlogForm = ({ handleNewBlogSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();

    handleNewBlogSubmit({
      title: title,
      author: author,
      url: url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 5 }}>
      <Typography variant="h4" style={{ marginBottom: 20 }}>
        Create new blog
      </Typography>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label='Title'
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
            style={{ marginBottom: 15 }}
          />
        </div>
        <div>
          <TextField
            label='Author'
            type="text"
            value={author}
            onChange={event => setAuthor(event.target.value)}
            style={{ marginBottom: 15 }}
          />
        </div>
        <div>
          <TextField
            label='URL'
            type="text"
            value={url}
            onChange={event => setUrl(event.target.value)}
            style={{ marginBottom: 15 }}
          />
        </div>
        <Button type="submit" variant="contained">create</Button>
      </form>
    </Box>
  );
};

export default BlogForm;
