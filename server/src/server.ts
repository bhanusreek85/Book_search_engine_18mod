import express from "express";
// import { Request, Response, NextFunction } from "express";
import path from "node:path";
import { fileURLToPath } from "url";
import db from "./config/connection.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "./schemas/index.js";
import { authenticateToken } from "./services/auth.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../client/dist")));
  }
  // Catch-all handler to serve the React app for any route not handled by the API
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
  });
  app.use(
    "/graphql",
    expressMiddleware(server as any, {
      context: async ({ req }) => {
        const contextReq = authenticateToken(req);
        return { user: contextReq.user };
      },
    })
  );

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
})();
