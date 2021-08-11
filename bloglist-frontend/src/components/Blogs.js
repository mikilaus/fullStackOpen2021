import React from "react";
import { useSelector } from "react-redux";

import MainBlog from "./MainBlog";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <div>
      {blogs.map((blog) => (
        <MainBlog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
