const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");
const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("notes are returned as json", async () => {
  await api.get("/api/blogs").expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("unique identifier of blog is named 'id'", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("a blog can be added", async () => {
  const newBlog = {
    title: "React stuff",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 5,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  blogsAfterAdded = await helper.blogsInDb();
  expect(blogsAfterAdded).toHaveLength(initialBlogs.length + 1);
});

test("undefined likes property will default to zero", async () => {
  const testBlog = {
    title: "React stuff",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  };

  await api
    .post("/api/blogs")
    .send(testBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  blogsAfterAdded = await helper.blogsInDb();
  expect(blogsAfterAdded[2].likes).toBe(0);
});

test("if url or title missing backend response with status 400", async () => {
  const testBlog = {
    title: "React stuff",
    author: "Michael Chan",
  };

  await api.post("/api/blogs").send(testBlog).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
