const commentsRouter = require("express").Router();
const Comment = require("../models/comment");

commentsRouter.get("/api/blogs/comments", async (request, response) => {
  const comments = await Comment.find({});
  response.json(comments);
});

commentsRouter.post("/api/blogs/:id/comments", async (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).send({
      error: "content missing",
    });
  }

  const comment = new Comment({
    content: body.content,
    blogId: request.params.id,
  });

  const savedComment = await comment.save();
  response.json(savedComment);
});

module.exports = commentsRouter;
