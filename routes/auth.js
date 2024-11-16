import express from 'express'
import { clerkWebHooks } from '../controller/auth.js'

const router = express.Router()

router.post("/registration", clerkWebHooks)

export default router