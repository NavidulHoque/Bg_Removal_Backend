"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, "Username already exists"],
        trim: true,
        minLength: [5, 'Username must be at least 5 characters long'],
        maxLength: [15, 'Username cannot exceed 15 characters'],
        match: [/^[a-zA-Z0-9]+$/, 'Username can only contain alphanumeric characters (no special characters and space are allowed)'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, "Email already exists"],
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters long'],
        match: [
            /^(?=.*\d)(?=.*[\W_]).{8,}$/,
            'Password must contain at least one number and one special character',
        ],
    },
}, { timestamps: true });
