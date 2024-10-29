// import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import type { Request } from 'express';
import dotenv from 'dotenv';
dotenv.config();

// interface JwtPayload {
//   _id: unknown;
//   username: string;
//   email: string,
// }

export const authenticateToken = ( req : Request) => {

  // Allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // If the token is sent in the authorization header, extract the token from the header
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  // If no token is provided, return the request object as is
  if (!token) {
    return req;
  }

  // Try to verify the token
  try {
    console.log('authenticateToken')
    const  data : any = jwt.verify(token, process.env.JWT_SECRET_KEY || 'Mykanna', { maxAge: '2hr' });
     req.user = data;
  } catch (err) {
    // If the token is invalid, log an error message
    console.log('Invalid token');
  }
     // Return the request object
  return req;
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || 'Mykanna';

  return jwt.sign(payload, secretKey, { expiresIn: '2h' });
};


export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message,  {
      extensions: { code: 'UNAUTHENTICATED' },
    });
    this.name = 'AuthenticationError';
  }
};
