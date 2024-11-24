import express from 'express'
import { readAnUser, updateAnUserCreditBalance } from '../controller/user.js'
import { protect } from '../controller/auth.js'

const router = express.Router()

router.post("/read", readAnUser)

router.put("/updateCredits", updateAnUserCreditBalance)

export default router