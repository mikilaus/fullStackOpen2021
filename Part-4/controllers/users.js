const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/api/users", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  response.json(users);
});

usersRouter.post("/api/users", async (request, response) => {
  const body = request.body;

  if (!(body.password && body.username)) {
    return response.status(400).send({
      error: "username or password is missing",
    });
  }

  const foundUsername = await User.findOne({ username: body.username });
  if (foundUsername !== null) {
    return response.status(400).send({
      error: "`username` has to be unique",
    });
  }
  const passLength = body.password.length;
  const usernameLength = body.username.length;

  if (usernameLength < 3 || passLength < 3) {
    return response.status(400).send({
      error: "username and password has to be at least 3 characters",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

module.exports = usersRouter;
