const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const User = require("../models/user");

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

test("blogs are returned as json", async () => {
  await api.get("/api/blogs").expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
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

  const user = {
    username: "root",
    password: "admin",
  };
  const response = await api.post("/api/login").send(user);
  const token = response.body.token;

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
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

  const user = {
    username: "root",
    password: "admin",
  };
  const response = await api.post("/api/login").send(user);
  const token = response.body.token;

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(testBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  blogsAfterAdded = await helper.blogsInDb();
  expect(blogsAfterAdded[2].likes).toBe(0);
});

test("if url or title missing backend response with status 400 and doesnt add the bad formatted blog", async () => {
  const testBlog = {
    title: "React stuff",
    author: "Michael Chan",
  };

  const user = {
    username: "root",
    password: "admin",
  };
  const response = await api.post("/api/login").send(user);
  const token = response.body.token;

  await api
    .post("/api/blogs")
    .set("Authorization", `bearer ${token}`)
    .send(testBlog)
    .expect(400);
  blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length);
});

test("adding blog fails if token is not provided or wrong", async () => {
  const newBlog = {
    title: "React stuff",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 5,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(401)
    .expect("Content-Type", /application\/json/);

  blogsAfterAdded = await helper.blogsInDb();
  expect(blogsAfterAdded).toHaveLength(initialBlogs.length);
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("admin", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mikilaus",
      name: "Miklos Komcsak",
      password: "admin",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "superuser",
      password: "admin",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` has to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode if username or password are missing", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: "superuser",
      password: "admin",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
