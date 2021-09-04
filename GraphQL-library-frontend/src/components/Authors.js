import React from "react";
import PropTypes from "prop-types";

import { ALL_PERSONS } from "../queries/queries";
import { useQuery } from "@apollo/client";

const Authors = (props) => {
  const result = useQuery(ALL_PERSONS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Authors.propTypes = {
  show: PropTypes.bool,
  authors: PropTypes.array,
};

export default Authors;