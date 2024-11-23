import express from 'express'
import { readAnUserCreditBalance, updateAnUserCreditBalance } from '../controller/user.js'
import { protect } from '../controller/auth.js'

const router = express.Router()

router.post("/readCredits", readAnUserCreditBalance)

router.put("/updateCredits", updateAnUserCreditBalance)

export default router