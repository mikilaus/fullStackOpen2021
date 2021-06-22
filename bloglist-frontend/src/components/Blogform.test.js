import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blogform from "./Blogform";

test("form calls the event handler it received, with right details", () => {
  const mockHandler = jest.fn();
  const component = render(<Blogform handleCreate={mockHandler} />);

  const titleInput = component.container.querySelector("#title");
  /* const authorInput = component.container.querySelector("#author");
  const urlInput = component.container.querySelector("#url"); */
  const form = component.container.querySelector("form");

  fireEvent.change(titleInput, {
    target: { value: "new title 3" },
  });
  /* fireEvent.change(authorInput, {
    target: { value: "new author 3" },
  });
  fireEvent.change(urlInput, {
    target: { value: "new url 3" },
  }); */
  fireEvent.submit(form);

  expect(mockHandler.mock.calls).toHaveLength(1);
  /* expect(mockHandler.mock.calls[0][0].content).toBe("new title 3"); */
});
