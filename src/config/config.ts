import dotenv from "dotenv"

dotenv.config()

export const MONGODB_URL = process.env.MONGODB_URL as string

export const PORT = Number(process.env.PORT)

export const FRONTEND_URL = process.env.FRONTEND_URL

export const NODE_ENV = process.env.NODE_ENV