import dotenv from "dotenv"

dotenv.config()

export const MONGODB_URL = process.env.MONGODB_URL

export const PORT = Number(process.env.PORT)

export const FRONTEND_URL = process.env.FRONTEND_URL

export const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

export const SECRET = process.env.SECRET
