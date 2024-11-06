import express from "express"
import { PORT } from "./config/config"
import connectDatabase from "./connectDatabase"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

async function startServer() {
    await connectDatabase()

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
}

startServer()