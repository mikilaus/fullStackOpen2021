const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
} = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const { v1: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";

const MONGODB_URI =
  "mongodb+srv://user:mongopw@book-app.1pnxu.mongodb.net/booksApp?retryWrites=true&w=majority";

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      /* if (args.author && args.genre) {
        return books.filter(
          (book) =>
            book.genres.find((genre) => genre === args.genre) === args.genre &&
            book.author === args.author
        );
      }
      if (args.genre) {
        return books.filter(
          (book) =>
            book.genres.find((genre) => genre === args.genre) === args.genre
        );
      }
      return args.author
        ? books.filter((book) => book.author === args.author)
        : books; */

      if (args.genre) {
        const filteredBooks = await Book.find({
          genres: { $in: args.genre },
        }).populate("author");
        return filteredBooks;
      }
      return Book.find({}).populate("author");
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      const booksOfAuthor = await Book.find({ author: root._id });
      return booksOfAuthor.length;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const thisAuthor = await Author.findOne({ name: args.author });
      const book = new Book({ ...args, author: thisAuthor._id });
      const currentUser = context.currentUser;

      /* if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      } */
      try {
        book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invaliArgs: args,
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name });
      author.born = parseInt(args.setBornTo);
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      try {
        author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invaliArgs: args,
        });
      }
      return author;
    },
    createUser: (root, args) => {
      const user = new User({ ...args });
      try {
        user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invaliArgs: args,
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);

      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
