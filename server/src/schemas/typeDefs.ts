const typeDefs = `
 type User {
    _id: ID!
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
    _id: ID!
    bookId:String!
    title: String!
    authors: [String]!
    description: String
    image:String
    link:String
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
    createBook(title: String!, author: String!, description: String!,image:String,link:String): Book
    deleteBook( bookId:String!):Book
    login(email: String!, password: String!): Auth
  }
`;

export default typeDefs;