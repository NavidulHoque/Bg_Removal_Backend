import mongoose from "mongoose";

export default async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1)
    }
}