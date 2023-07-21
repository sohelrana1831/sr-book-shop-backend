import { Schema, Types, model } from "mongoose";
import { IBook } from "./bookInterface";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    imageLink: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    publicationYear: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    reviews: [
      {
        review: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const BookModel = model<IBook>("Book", bookSchema);
