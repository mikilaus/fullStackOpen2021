import React from "react";
import { useSelector } from "react-redux";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
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
                <tr>
                  <td>{user.name}</td>
                  <td>{user.blogs.length}</td>
                </tr>
              )
          )}
      </tbody>
    </table>
  );
};

export default Users;
