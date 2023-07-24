"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
            reviewBy: {
                type: String,
                required: true,
            },
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.BookModel = (0, mongoose_1.model)("Book", bookSchema);
