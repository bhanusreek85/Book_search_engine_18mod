// import { BookDocument } from '../models/Book';
import { User } from "../models/index.js";
import { ObjectId } from "mongodb";
import { BookDocument } from "../models/Book.js";
import { signToken, AuthenticationError } from "../services/auth.js";

// Define interfaces for User and Book
interface User {
  _id: ObjectId;
  // id: ObjectId;
  username: string;
  email: string;
  password: string;
  savedBooks: BookDocument[];
}

// Define interface for Context
interface Context {
  user: User | null;
}

// Define interfaces for mutation arguments
interface CreateUserArgs {
  username: string;
  email: string;
  password: string;
}

interface CreateBookArgs {
  title: string;
  authors: string;
  description: string;
  image: string;
  link: string;
}

const resolvers = {
  Query: {
    users: async (
      _parent: any,
      _args: any,
      context: Context
    ): Promise<User[]> => {
      if (context.user) {
        return await User.find();
      }
      throw new AuthenticationError("Unauthorized");
    },
    user: async (
      _: any,
      { id }: { id: string },
      context: Context
    ): Promise<User | null> => {
      if (!context.user) throw new AuthenticationError("Unauthorized");
      return await User.findOne({ _id: new ObjectId(id) });
    },
    books: async (_: any, context: Context): Promise<BookDocument[]> => {
      if (!context.user) throw new AuthenticationError("Unauthorized");
      const userDoc = await User.findOne({ _id: context.user._id });
      if (!userDoc) return [];
      return userDoc.savedBooks.map((book) => ({
        ...book.toObject(),
        id: book.id.toString(),
        author:
          Array.isArray(book.authors) && book.authors.length > 0
            ? book.authors.join(", ")
            : "Unknown Author",
      }));
    },
    book: async (
      _: any,
      bookId: string,
      context: Context
    ): Promise<BookDocument | null> => {
      if (!context.user) throw new AuthenticationError("Unauthorized");
      const userDoc = await User.findOne({ _id: context.user._id });
      if (!userDoc) return null;
      const book = userDoc.savedBooks.find((book) => book.bookId === bookId);
      if (!book) return null;
      return {
        ...book.toObject(),
        id: book.id.toString(), // Ensure id is set
        author:
          Array.isArray(book.authors) && book.authors.length > 0
            ? book.authors.join(", ")
            : "Unknown Author",
      };
    },
    me: async (
      _parent: unknown,
      _args: unknown,
      context: Context
    ): Promise<User | null> => {
      if (!context.user) throw new AuthenticationError("Unauthorized");
      // If user is authenticated, return their profile
      const userId = new ObjectId(context.user._id);
      const user = await User.findOne({ _id: userId });

      if (!user) return null;

      // Transform the savedBooks array to ensure author is a string
      const transformedUser = {
        ...user.toObject(),
        savedBooks: user.savedBooks.map((book: BookDocument) => ({
          ...book.toObject(),
          authors: Array.isArray(book.authors)
            ? book.authors
            : (book.authors as string)
                .split(",")
                .map((name: string) => name.trim()),
        })),
      };

      console.log(transformedUser);
      return transformedUser as User;
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { username, email, password }: CreateUserArgs
    ): Promise<{ token: string; user: User }> => {
      const newUser = await User.create({ username, email, password });
      // Sign a JWT token for the new profile
      const token = signToken(newUser.username, newUser.email, newUser._id);

      return { token, user: newUser as User };
    },
    createBook: async (
      _: any,
      { title, authors, description, image, link }: CreateBookArgs,
      context: Context
    ): Promise<BookDocument> => {
      if (!context.user) throw new AuthenticationError("Unauthorized");
      const userId = new ObjectId(context.user._id);
      const userDoc = await User.findOne({ _id: userId });
      if (!userDoc) {
        throw new Error("User not found");
      }
      const authorsArray = authors
        ? authors.split(",").map((name: string) => name.trim())
        : ["Unknown"];

      const newBookId = new ObjectId();
      const newBook: any = {
        _id: newBookId,
        bookId: newBookId.toString(),
        title: title,
        authors: authorsArray,
        description: description || "",
        image: image,
        link: link,
      };
      userDoc.savedBooks.push(newBook);
      await userDoc.save();
      return {
        ...newBook,
        id: newBook._id.toString(),
        author: authorsArray.join(", "),
      };
    },
    deleteBook: async (
      _: any,
     { bookId }: { bookId: string },
      context: Context
    ): Promise<BookDocument | null> => {
      if (!context.user) throw new AuthenticationError("Unauthorized");
      const userId = new ObjectId(context.user._id);
      console.log(context.user._id);
      console.log(userId);
      const userDoc = await User.findOne({ _id: context.user._id });
      if (!userDoc) {
        throw new Error("User not found");
      }
      console.log("Bookid is", bookId);
      // const bookIdStr = bookId.toString();
      const bookToDelete = userDoc.savedBooks.find(
        (book) => book.bookId === bookId
      );
      if (!bookToDelete) {
        throw new Error(`Book not found with id: ${bookId}`);
      }
      userDoc.savedBooks = userDoc.savedBooks.filter(
        (book) => book.bookId !== bookId
      );
      await userDoc.save();
    

      return bookToDelete;
      // if (bookIndex === -1) {
      //   throw new Error(`Book not found with id: ${bookId}`);
      // }
      //  const [deletedBook]=  userDoc.savedBooks.splice(bookIndex, 1); // Remove the book from the array
      //   await userDoc.save(); // Save the updated user document

      // return deletedBook;
    },
    login: async (
      _parent: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Unauthorized");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Unauthorized");
      }
      const token = signToken(user.username, user.email, user._id);
      return { token, user: user };
    },
  },
};

export default resolvers;
