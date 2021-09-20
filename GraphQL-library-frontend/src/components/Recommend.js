import React, { useState } from "react";
import PropTypes from "prop-types";

import { BOOKS_BY_GENRE, USER } from "../queries/queries";
import { useQuery } from "@apollo/client";

const Recommend = ({ show }) => {
  const [books, setBooks] = useState(null);
  const [favorite, setFavorite] = useState("classic");
  const user = useQuery(USER, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    onCompleted: (data) => {
      setFavorite(data.me.favoriteGenre);
    },
  });
  const result = useQuery(BOOKS_BY_GENRE, {
    fetchPolicy: "no-cache",
    variables: { genreToFilter: favorite },
    onCompleted: (data) => {
      setBooks(data.allBooks);
    },
  });

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  if (!result.data) {
    return <div>no Book found..</div>;
  }

  return (
    <div>
      <h2>books</h2>

      {user.data.me && (
        <p>books in your favorite genre: {user.data.me.favoriteGenre}</p>
      )}

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

Recommend.propTypes = {
  show: PropTypes.bool,
};

export default Recommend;
