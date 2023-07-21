import { Model } from "mongoose";

export type IBook = {
  id: number | string;
  author: string;
  title: string;
  genre: string;
  userEmail: string;
  publicationDate: Date | string;
  image_link: string;
  reviews?: string[];
  publicationYear?: string;
};

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: number;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
