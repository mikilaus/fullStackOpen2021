import React from "react";

import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Users = ({ users }) => (
  <>
    <h3>Users</h3>
    <Table striped>
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
    </Table>
  </>
);

export default Users;
