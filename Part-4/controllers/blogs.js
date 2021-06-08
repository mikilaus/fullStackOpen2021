const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/api/blogs", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/api/blogs", async (request, response) => {
  if (!request.body.likes) {
    request.body.likes = 0;
  }
  if (!request.body.title || !request.body.url) {
    response.status(400);
  }
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  response.json(savedBlog);
});

module.exports = blogsRouter;
