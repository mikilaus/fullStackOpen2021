import React, { useState, useEffect } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Loginform from "./components/LoginForm";
import Recommend from "./components/Recommend";

import { BOOK_ADDED, ALL_BOOKS } from "./queries/queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    let currentToken = localStorage.getItem("Bookapp-token");
    setToken(currentToken);
  }, []);

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`${addedBook.title} added`);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();

    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {!token && <button onClick={() => setPage("login")}>login</button>}

        {token && (
          <button onClick={() => setPage("recommend")}>recommend</button>
        )}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook
        show={page === "add"}
        setPage={setPage}
        updateCacheWith={updateCacheWith}
      />

      <Loginform
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
      />

      {token && <Recommend show={page === "recommend"} />}
    </div>
  );
};

export default App;
