import express from 'express'
import { createAnUser, loginAnUser, logoutAnUser } from '../controller/auth.js'

const router = express.Router()

router.post("/registration", createAnUser)

router.post("/login", loginAnUser)

router.get("/logout", logoutAnUser)

export default router