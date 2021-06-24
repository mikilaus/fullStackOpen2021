const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { userExtractor } = require("../middleware");

blogsRouter.get("/api/blogs", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/api/blogs", userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!user || !user.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const thisUser = await User.findById(user.id);
  if (!thisUser) {
    return response.status(400).json({
      error: "user not found",
    });
  }

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "title or url is missing",
    });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: thisUser._id,
  });

  const savedBlog = await blog.save();

  thisUser.blogs = await thisUser.blogs.concat(savedBlog._id);
  await thisUser.save();
  response.json(savedBlog);
});

blogsRouter.delete(
  "/api/blogs/:id",
  userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    const user = request.user;

    if (user.id !== blog.user.toString()) {
      return response
        .status(401)
        .json({ error: "You are not the creator of this blog" });
    }

    try {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } catch (error) {
      response.json({
        error: "Blog has not found",
      });
    }
  }
);

blogsRouter.put("/api/blogs/:id", async (request, response) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    response.json(updatedBlog);
  } catch (error) {
    console.log(error);
  }
});

module.exports = blogsRouter;
