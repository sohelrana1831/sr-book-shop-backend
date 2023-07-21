import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import { BookServices } from "./bookServices";
import pick from "../../../shared/pick";
import { IBook } from "./bookInterface";
import sendResponse from "../../../shared/sendResponse";
import { bookFilterableFields } from "./bookConstant";
import { paginationFieldOptions } from "./../../../constants/pagination";

const createBook: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await BookServices.createBook(data);
  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Create book successfully!",
    data: result,
  });
});

const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFieldOptions);

  const result = await BookServices.getAllBook(filters, paginationOptions);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book retrieved successfully !",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBook: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BookServices.getSingleBook(id);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book retrieved successfully",
    data: result,
  });
});

const updateBook: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const book = req.body;
  const result = await BookServices.updateBook(id, book);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book updated successfully",
    data: result,
  });
});

const deleteBook: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BookServices.deleteBook(id);

  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book deleted successfully",
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
};
