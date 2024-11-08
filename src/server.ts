import express, { Request, Response } from "express"
import { FRONTEND_URL, PORT } from "./config/config"
import connectDatabase from "./connectDatabase"
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))

app.use(cookieParser())

app.get("/", (req: Request, res: Response) => {
    res.send("API Working");
});

async function startServer() {
    await connectDatabase()

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

startServer()