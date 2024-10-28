const typeDefs = `
 type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks:[Book]
  }

   type Auth{
   token:ID!
   user:User
   }
  type Book {
    id: ID!
    title: String!
    author: String!
    description: String
  }

  type Query {
    users: [User]
    user(id: ID!): Auth
    books: [Book]
    book(bookId:ID!): Book
    me:User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    createBook(title: String!, author: String!, description: String!): Book
    deleteBook( bookId:ID!):String
    login(email: String!, password: String!): Auth
  }
`;

export default typeDefs;