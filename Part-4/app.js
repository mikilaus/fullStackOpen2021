const config = require("./utils/config");
const logger = require("./utils/logger");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const mongoose = require("mongoose");

logger.info("connecting to", config.MONGODB_URI);

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());

app.use(blogsRouter);

module.exports = app;
