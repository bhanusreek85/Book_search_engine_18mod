import { gql } from "@apollo/client";

export const getUsers = gql`
  query getUsers {
    users {
      id
      username
      email
      password
      savedBooks {
        id
        title
        author
        description
      }
    }
  }
`;

export const getUser = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
      password
      savedBooks {
        id
        title
        author
        description
      }
    }
  }
`;

export const getBooks = gql`
  query getBooks {
    books {
      id
      title
      author
      description
    }
  }
`;

export const getBook = gql`
  query getBook($bookId: ID!) {
    book(id: $bookId) {
      id
      title
      author
      description
    }
  }
`;

export const me = gql`
  query me {
    me {
      id
      username
      email
    }
  }
`;