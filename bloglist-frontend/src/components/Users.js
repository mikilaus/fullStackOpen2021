import React from "react";

import { Link } from "react-router-dom";

const Users = ({ users }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Blogs created</th>
      </tr>
    </thead>
    <tbody>
      {users &&
        users.map(
          (user) =>
            user.username !== "root" && (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
        )}
    </tbody>
  </table>
);

export default Users;
