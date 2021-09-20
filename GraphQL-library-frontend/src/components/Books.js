import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { ALL_BOOKS, ALL_GENRES, BOOKS_BY_GENRE } from "../queries/queries";
import { useQuery, useLazyQuery } from "@apollo/client";

const Books = ({ show }) => {
  const [uniqueGenres, setUniqueGenres] = useState(null);
  const [books, setBooks] = useState(null);
  const [getBooksByGenre, bookResult] = useLazyQuery(BOOKS_BY_GENRE, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (bookResult.data) {
      setBooks(bookResult.data.allBooks);
    }
  }, [bookResult]);

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

  const showBooksByGenre = (genre) => {
    getBooksByGenre({ variables: { genreToFilter: genre } });
  };

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
      <button onClick={() => setBooks(result.data.allBooks)}>all Books</button>
      {uniqueGenres &&
        uniqueGenres.map((genre) => (
          <button onClick={() => showBooksByGenre(genre)} key={genre}>
            {genre}
          </button>
        ))}
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
