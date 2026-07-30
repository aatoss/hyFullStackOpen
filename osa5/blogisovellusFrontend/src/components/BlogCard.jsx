import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Box, Typography, Button } from '@mui/material'

const BlogCard = ({ blog, handleBlogLike, handleDeleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? (blog.user.id || blog.user) : null
    }
    handleBlogLike(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDeleteBlog(blog.id)
    }
  }

  return (
    <Card style={{ boxShadow: 4, marginBottom: 2, border: '1px solid #ccc' }}>
      <CardContent>
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
          <Typography variant="h6">
            <Link to={`/blogs/${blog.id}`} >
              {blog.title} written by {blog.author}
            </Link>
          </Typography>
          <Button variant="outlined" size="small" onClick={toggleVisibility}>
            {visible ? 'hide' : 'view'}
          </Button>
        </Box>
        {visible && (
          <Box>
            <Typography style={{ mb: 1 }}>
              <Link href={blog.url}>
                {blog.url}
              </Link>
            </Typography>
            <Typography style={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                            likes: {blog.likes}
              {user && (
                <Button variant="contained" size="small" onClick={handleLike}>
                                    like
                </Button>)}
            </Typography>
            <Typography color="text.secondary" style={{ mb: 1 }}>
              {blog.user && (blog.user.name || blog.user.username || blog.user)}
            </Typography>
            {blog.user?.username === user?.username && (
              <Button variant="contained" color="error" size="small" onClick={handleDelete} style={{ mt: 1 }}>
                                remove
              </Button>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default BlogCard