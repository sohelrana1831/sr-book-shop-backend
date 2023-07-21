import { Model, Schema, Types } from "mongoose";

export type IBook = {
  id: number | string;
  author: string;
  title: string;
  genre: string;
  publication_date: string;
  image_link: string;
  reviews?: string[];
};

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: number;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
