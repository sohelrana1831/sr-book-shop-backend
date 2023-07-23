import ApiError from "../../../error/ApiError";
import httpStatus from "http-status";
import { IBook, IBookFilters, IReview } from "./bookInterface";
import { BookModel } from "./bookModel";
import { IPaginationOptions } from "../../../interface/pagination";
import { IGenericResponse } from "../../../interface/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { bookSearchableFields } from "./bookConstant";
import { SortOrder } from "mongoose";

const createBook = async (payload: IBook): Promise<IBook | null> => {
  // const createBook = await Book.create(payload);
  const createBook = await BookModel.create(payload);
  if (!createBook) {
    throw new Error("Failed to create Book Data!");
  }
  return createBook;
};

const getAllBook = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [] as Array<{ [key: string]: any }>;
  // or const andConditions = [] as Array<{ [key: string]: any }>;

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        // Add a $regex condition with the 'i' option for case-insensitive search
        return {
          [field]: {
            $regex: new RegExp(String(value), "i"),
          },
        };
      }),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await BookModel.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await BookModel.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await BookModel.findById(id);
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const result = await BookModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const reviewBook = async (
  id: string,
  payload: Partial<IReview>
): Promise<IBook | null> => {
  const isExist = await BookModel.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book do not exist!");
  }
  const result = await BookModel.findByIdAndUpdate(
    id,
    {
      $push: {
        reviews: payload,
      },
    },
    {
      new: true,
    }
  );
  return result;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await BookModel.findByIdAndDelete({ _id: id });
  if (result) {
    return result;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Id!");
  }
};

export const BookServices = {
  createBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
  reviewBook,
};
