import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { initUsers } from "../reducers/usersReducer";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);

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
