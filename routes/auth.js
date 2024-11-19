import express from 'express'
import { createAnUserByCredentials, createAnUserByProviders, loginAnUser, logoutAnUser } from '../controller/auth.js'

const router = express.Router()

//for credentials purpose
router.post("/registration", createAnUserByCredentials)

router.post("/login", loginAnUser)

router.get("/logout", logoutAnUser)

//for 3rd party providers
router.post("/create", createAnUserByProviders)

export default router