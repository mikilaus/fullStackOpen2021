import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

import { ALL_PERSONS, UPDATE_AUTHOR } from "../queries/queries";

import { useQuery, useMutation } from "@apollo/client";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [selectValue, setSelectValue] = useState("");

  const result = useQuery(ALL_PERSONS);
  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_PERSONS }],
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const authors = result.data.allAuthors;

  const submit = (e) => {
    e.preventDefault();

    editAuthor({ variables: { name, setBornTo: parseInt(born) } });

    setName("");
    setBorn("");
  };

  const handleSelect = (e) => {
    setSelectValue(e.target.value);
    setName(e.target.value);
  };

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
      <br />
      <form onSubmit={submit}>
        <div>
          name
          <select value={selectValue} onChange={handleSelect}>
            <option>Select Author</option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  );
};

Authors.propTypes = {
  show: PropTypes.bool,
  authors: PropTypes.array,
};

export default Authors;
