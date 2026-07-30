import { Link } from 'react-router-dom'
import { Card, CardContent, Typography, Button } from '@mui/material'

const Blog = ({ blog, handleBlogLike, handleDeleteBlog, user }) => {

  if (!blog) {
    return null
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
    <Card style={{ boxShadow: 4 }}>
      <CardContent>
        <Typography variant='h4' >{blog.title}</Typography>
        <Typography variant='subtitle1' >by {blog.author}</Typography>
        <Typography variant='body1'><Link >{blog.url}</Link></Typography>
        <Typography variant='body1' style={{ marginBottom: 5 }}>
          Added by {blog.user.name}
        </Typography>
        <Typography variant='body1' style={{ marginBottom: 5 }}>
          {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
        </Typography>
        {user && (
          <div style={{ marginTop: 10 }}>
            <Button style={{ marginRight: 10 }} variant='outlined' onClick={handleLike} color='primary'>Like</Button>
            {blog.user?.username === user?.username && (
              <Button variant='outlined' onClick={handleDelete} color='error'>Delete</Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default Blog