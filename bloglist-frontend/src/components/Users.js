import React from "react";

import { Link } from "react-router-dom";
import { Container, Table } from "react-bootstrap";

const Users = ({ users }) => (
  <Container className="mt-5">
    <h3 className="mb-3">Users:</h3>
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
  </Container>
);

export default Users;
