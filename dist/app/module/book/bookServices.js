"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookServices = void 0;
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const bookModel_1 = require("./bookModel");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const bookConstant_1 = require("./bookConstant");
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const createBook = await Book.create(payload);
    const createBook = yield bookModel_1.BookModel.create(payload);
    if (!createBook) {
        throw new Error("Failed to create Book Data!");
    }
    return createBook;
});
const getAllBook = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // or const andConditions = [] as Array<{ [key: string]: any }>;
    if (searchTerm) {
        andConditions.push({
            $or: bookConstant_1.bookSearchableFields.map((field) => ({
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
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield bookModel_1.BookModel.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield bookModel_1.BookModel.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookModel_1.BookModel.findById(id);
    return result;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookModel_1.BookModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const reviewBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield bookModel_1.BookModel.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book do not exist!");
    }
    const result = yield bookModel_1.BookModel.findByIdAndUpdate(id, {
        $push: {
            reviews: payload,
        },
    }, {
        new: true,
    });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookModel_1.BookModel.findByIdAndDelete({ _id: id });
    if (result) {
        return result;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid Id!");
    }
});
exports.BookServices = {
    createBook,
    getAllBook,
    getSingleBook,
    updateBook,
    deleteBook,
    reviewBook,
};
