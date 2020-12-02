require("dotenv").config()
const jwt = require("jsonwebtoken")
const {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError,
  PubSub
} = require("apollo-server")
const pubsub = new PubSub()
const mongoose = require("mongoose")
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")

const JWT_SECRET = process.env.SECRET
const MONGODB_URI = process.env.MONGODB_URI
console.log("connecting to", MONGODB_URI)

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String
      genres: [String]
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const authorId = (await Author.findOne({ name: root.name }))._id
      return Book.collection.countDocuments({ author: authorId })
    },
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      if (!(args.author || args.genre)) {
        return Book.find({}).populate("author")
      } else if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        const authorId = author ? author._id : null

        return Book.find({
          author: authorId,
          genres: { $elemMatch: { $eq: args.genre } },
        }).populate("author")
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author })
        const authorId = author ? author._id : null

        return Book.find({ author: authorId }).populate("author")
      } else if (args.genre) {
        return Book.find({
          genres: { $elemMatch: { $eq: args.genre } },
        }).populate("author")
      }
    },

    allAuthors: () => Author.find({}),

    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        const foundAuthor = await Author.findOne({ name: args.author })
        let authorId = foundAuthor ? foundAuthor._id : null

        if (!authorId) {
          const author = await new Author({ name: args.author })
          authorId = author._id

          try {
            await author.save()
          } catch (err) {
            throw new UserInputError(err.message, {
              invalidArgs: args,
            })
          }
        }

        const book = new Book({ ...args, author: authorId })
        try {
          await book.save()
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args,
          })
        }

        const populatedNewBook = await Book.findById(book._id).populate("author")

        pubsub.publish('BOOK_ADDED', {bookAdded: populatedNewBook})

        return populatedNewBook
      } catch (err) {
        throw new UserInputError(err.message)
      }
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        })
      }
      return author
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      // For simplicity, we assume all users use the same hardcoded password.
      if (!user || args.password !== "secred") {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

// typeDefs contains the GraphQL schema
// resolvers is an objects, containin the resolvers of the server, which define how queries are responded to.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // the third parameter (context) returns an object which is given to all resolvers as a third prameter, useful when they all need to perform the same operation (in this case, login).
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl  }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
