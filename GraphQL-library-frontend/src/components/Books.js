import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { ALL_BOOKS, ALL_GENRES } from "../queries/queries";
import { useQuery } from "@apollo/client";

const Books = ({ show }) => {
  const [uniqueGenres, setUniqueGenres] = useState(null);
  const [books, setBooks] = useState(null);

  const result = useQuery(ALL_BOOKS, {
    onCompleted: (data) => {
      setBooks(data.allBooks);
    },
  });

  useQuery(ALL_GENRES, {
    onCompleted: (data) => {
      const filteredGenres = [];
      data.allBooks.map((book) => {
        return book.genres.map((genre) => filteredGenres.push(genre));
      });
      setUniqueGenres([...new Set(filteredGenres)]);
    },
  });

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre:</p>
      {uniqueGenres &&
        uniqueGenres.map((genre) => <button key={genre}>{genre}</button>)}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Books.propTypes = {
  show: PropTypes.bool,
};

export default Books;
