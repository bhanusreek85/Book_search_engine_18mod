# Book Search Engine

A full-stack book search engine application that allows users to search for books using the Google Books API, save their favorite books, and manage their saved books. The application is built with React for the frontend, Node.js and Express for the backend, and MongoDB for the database.

## Table of Contents

- [Book Search Engine](#book-search-engine)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Deployment](#deployment)
  - [Environment Variables](#environment-variables)
  - [Technologies Used](#technologies-used)
  - [Models](#models)
  - [Contributions](#Contributions)
  - [License](#license)

## Features

- Search for books using the Google Books API
- Save favorite books to a personal list
- View and manage saved books
- User authentication and authorization

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/your-username/book-search-engine.git```
  cd book-search-engine 
  ```

2.  Install server dependencies:
      ```bash
    cd server
    npm install
    ```

3. Navigate to the client directory and install client dependencies:
    ```bash
    cd client
    npm install
    ```
    

## Usage

Start the development server:
  ```bash
  npm run start
  ```
This will start both the backend server and the frontend development server concurrently.
Open your browser and navigate to http://localhost:3000 to use the application.

## Deployment
Deploying to Render
1. Create a Render account at render.com.
2. Create a new web service and connect your GitHub repository.

3. Set the build and start commands in the Render dashboard:

    Build Command: npm run build
    Start Command: npm start

4. Set the necessary environment variables in Render:

    MONGODB_URI: Your MongoDB connection string
    JWT_SECRET: Your JWT secret key

5. Deploy your application by following the prompts in the Render dashboard.

## Environment Variables
Create a .env file in the root directory and add the following environment variables:
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/googlebooks?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret

## Technologies Used
  Frontend: React, Vite
  Backend: Node.js, Express
  Database: MongoDB, Mongoose
  Authentication: JWT (JSON Web Tokens)
  Deployment: Render

## Models

### User
username: String, required
email: String, required, unique
password: String, required
savedBooks: Array of book objects

### Book Object 
title: String, required
authors: Array of strings
description: String
image: String
link: String  

## Contributions
Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License
This project is licensed under the MIT License.
