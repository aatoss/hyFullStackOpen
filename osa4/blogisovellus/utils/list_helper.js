const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const blog = blogs.reduce((favourite, current) => favourite.likes > current.likes ? favourite : current)
  return { title: blog.title, author: blog.author, likes: blog.likes }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const countByAuthor = lodash.countBy(blogs, getAuthor)
  const authorWithMostBlogs = findAuthorWithMostBlogs(countByAuthor)
  return { author: authorWithMostBlogs, blogs: countByAuthor[authorWithMostBlogs] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const blogAuthors = lodash.groupBy(blogs, getAuthor)
  const authorsTotalLikes = countTotalLikes(blogAuthors)
  return authorsTotalLikes.reduce((mostLikes, current) =>
    mostLikes.likes > current.likes ? mostLikes : current
  )
}

const getAuthor = (blog) => {return blog.author}

const findAuthorWithMostBlogs = (countByAuthor) => {
  return Object.keys(countByAuthor).reduce((a, b) => countByAuthor[a] > countByAuthor[b] ? a : b)
}

const countTotalLikes = (authorsWithBlogs) => {
  return Object.entries(authorsWithBlogs).map(([author, blogs]) => {
    const totalLikes = blogs.reduce((total, blog) => total + blog.likes, 0)
    return { author: author, likes: totalLikes }
  })
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}