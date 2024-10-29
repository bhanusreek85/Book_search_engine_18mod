import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
export const CREATEBOOK = gql`
  mutation createBook(
    $title: String!
    $authors: String!
    $description: String!
    $image:String
    $link:String
  ) {
    createBook(title: $title, author: $authors, description: $description,image:$image,link:$link) {
      _id
      bookId
      title
      authors
      description
      image
      link
    }
  }
`;
export const DELETEBOOK=gql`
mutation deleteBook($bookId:String!){
    deleteBook( bookId:$bookId){
      _id
      title
      authors
      description

    }
    }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`;
