import { gql } from "@apollo/client";

export const getUsers = gql`
  query getUsers {
    users {
      _id
      username
      email
      password
      savedBooks {
        _id
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;

export const getUser = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      _id
      username
      email
      password
      savedBooks {
        _id
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;

export const getBooks = gql`
  query getBooks {
    books {
      _id
      title
      authors
      description
      image
      link
    }
  }
`;

export const getBook = gql`
  query getBook($bookId: ID!) {
    book(id: $bookId) {
      _id
      title
      authors
      description
      image
      link
    }
  }
`;

export const GETME = gql`
  query me {
    me {
      _id
      username
      email
      savedBooks {
        _id
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;