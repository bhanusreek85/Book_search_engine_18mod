import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation createUser($input:UserInput!){
    createUser(input:$input){
        id
        username
        email
        password
    }
}
`;
export const createBook = gql`
mutation createBook( $title: title!, $author: author!, $description: description!){
    createBook(title: $title, author: $author, description: $description){
        id
        title
        author
        description
    }
}
`;
// export const deleteBook=gql`
// mutation deleteBook($bookId:ID!){
//     deleteBook( bookId:$bookId){

//     }
//     }
// `;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
        password
      }
    }
  }
`;