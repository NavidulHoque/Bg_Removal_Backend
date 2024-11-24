import express from 'express'
import { createAnUser, loginAnUser } from '../controller/auth.js'

const router = express.Router()

router.post("/registration", createAnUser)

router.post("/login", loginAnUser)

export default router