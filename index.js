import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoute from './routes/auth.js'
import connectDatabase from './config/connectDatabase.js'
import { FRONTEND_URL, PORT } from './config/config.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))


app.use(cookieParser())
app.use("/api/auth", authRoute)


async function startServer() {

    await connectDatabase()

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

startServer()