/* eslint-disable no-undef */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("renders title and author", () => {
  const blog = {
    title: "new blog title",
    author: "new blog author",
    url: "new blog url",
    likes: 127,
    user: {
      username: "mikilaus",
      name: "Miklos Komcsak",
      id: "60cc711373d19313d7e86601",
    },
    id: "60cc714c73d19313d7e86602",
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent("new blog title");
  expect(component.container).toHaveTextContent("new blog author");
  expect(component.container).not.toHaveTextContent("new blog url");
  expect(component.container).not.toHaveTextContent("Likes:");
});

test("url and likes are shown when 'show' button is pressed", () => {
  const blog = {
    title: "new blog title",
    author: "new blog author",
    url: "new blog url",
    likes: 127,
    user: {
      username: "mikilaus",
      name: "Miklos Komcsak",
      id: "60cc711373d19313d7e86601",
    },
    id: "60cc714c73d19313d7e86602",
  };

  const user = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2lsYXVzIiwiaWQiOiI2MGNjNzExMzczZDE5MzEzZDdlODY2MDEiLCJpYXQiOjE2MjQyOTQ3NTJ9.J0wGBouhthJAy0VzTCdqIeJKqdpF7oPx7KC16JEWPvI",
    username: "mikilaus",
    name: "Miklos Komcsak",
  };
  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog} setVisible={mockHandler} user={user} />
  );

  const button = component.getByText("view");
  fireEvent.click(button);

  expect(component.container).toHaveTextContent("new blog url");
  expect(component.container).toHaveTextContent("Likes:");
});

test("if like button clicked twice, the event handler also called twice", () => {
  const blog = {
    title: "new blog title",
    author: "new blog author",
    url: "new blog url",
    likes: 127,
    user: {
      username: "mikilaus",
      name: "Miklos Komcsak",
      id: "60cc711373d19313d7e86601",
    },
    id: "60cc714c73d19313d7e86602",
  };

  const user = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2lsYXVzIiwiaWQiOiI2MGNjNzExMzczZDE5MzEzZDdlODY2MDEiLCJpYXQiOjE2MjQyOTQ3NTJ9.J0wGBouhthJAy0VzTCdqIeJKqdpF7oPx7KC16JEWPvI",
    username: "mikilaus",
    name: "Miklos Komcsak",
  };
  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog} handleLike={mockHandler} user={user} />
  );

  const showButton = component.getByText("view");
  fireEvent.click(showButton);

  const likeButton = component.getByText("Like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
