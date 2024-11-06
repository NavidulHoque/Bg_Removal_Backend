import mongoose from "mongoose";
import { MONGODB_URL } from "./config/config";

export default async function connectDatabase() {
    try {
        await mongoose.connect(MONGODB_URL)
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1)
    }
}