import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import MainBlog from "./MainBlog";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <Container className="mt-5">
      <h3 className="mb-3">Blogs:</h3>
      {blogs.map((blog) => (
        <MainBlog key={blog.id} blog={blog} />
      ))}
    </Container>
  );
};

export default Blogs;
