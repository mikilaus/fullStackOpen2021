import React from "react";
import { Link } from "react-router-dom";

function MainBlog({ blog }) {
  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    marginBottom: 5,
    marginTop: 10,
    border: "solid 2px",
  };

  return (
    <div style={blogStyle} className="blog">
      <h3>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </h3>
    </div>
  );
}

export default MainBlog;
