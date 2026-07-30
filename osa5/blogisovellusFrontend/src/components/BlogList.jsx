import { Link } from "react-router-dom"
import { Box, Typography } from "@mui/material";
import BlogCard from "./BlogCard";

const BlogList = ({ blogs, handleBlogLike, handleDeleteBlog, user }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <Box style={{ display: "flex", flexDirection: "column", marginLeft: 2, marginTop: 2 }}>
      <Typography variant="h4" style={{ marginBottom: 10 }}>
        Saved blogs
      </Typography>
      <Box>
        {sortedBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            handleBlogLike={handleBlogLike}
            handleDeleteBlog={handleDeleteBlog}
            user={user}
          />
        ))}</Box>
    </Box>
  )
}

export default BlogList