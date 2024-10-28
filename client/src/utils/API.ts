import type { User } from '../models/User.js';
import type { Book } from '../models/Book.js';
import {me} from './queries.js';
// route to get logged in user's info (needs the token)
export const getMe = (token: string) => {
   return fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ me }),
  }).then(response => response.json());
};

// export const createUser = (userData: User) => {
//   return fetch('/graphql', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     // body: JSON.stringify({
//     //   query: mutation,
//     //   variables: {
//     //     username: userData.username,
//     //     email: userData.email,
//     //     password: userData.password,
//     //   },
//     }),
//   }).then(response => response.json());
// };

export const loginUser = (userData: User) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save book data for a logged in user
export const saveBook = (bookData: Book, token: string) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
};

// remove saved book data for a logged in user
export const deleteBook = (bookId: string, token: string) => {
  return fetch(`/api/users/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query: string) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
