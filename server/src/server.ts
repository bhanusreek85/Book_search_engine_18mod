import express from "express";
// import {Request, Response,NextFunction} from "express";
// import path from "node:path";
import db from "./config/connection.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "./schemas/index.js";
import { authenticateToken } from './services/auth.js'; 

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});
(async () => {
  await server.start();
  db.on("error", (error) => {
    console.error("Error connecting to the database", error);
  });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // if we're in production, serve client/build as static assets
  // if (process.env.NODE_ENV === "production") {
  //   app.use(express.static(path.join(__dirname, "../client/build")));
  // }

   app.use('/graphql', expressMiddleware(server as any,
    {
      context:async ({ req }) => {
        const contextReq = authenticateToken(req);
        return { user:contextReq.user };
      },
    }
  ));


  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
})();
 