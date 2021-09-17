import { gql } from "@apollo/client";

export const ALL_PERSONS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation editBorn($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const USER = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;

export const BOOKS_BY_GENRE = gql`
  query booksByGenre($genreToFilter: String!) {
    allBooks(genre: $genreToFilter) {
      title
      published
      author {
        name
      }
    }
  }
`;

export const ALL_GENRES = gql`
  query {
    allBooks {
      genres
    }
  }
`;
