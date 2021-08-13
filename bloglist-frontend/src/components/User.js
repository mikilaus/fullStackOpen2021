import React from "react";

function User({ user }) {
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2 className="mb-3">{user.name}</h2>
      <h4 className="mb-3">Added blogs:</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id} className="mb-1">
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default User;
