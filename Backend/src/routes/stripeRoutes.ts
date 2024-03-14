/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { createSession } from '../controllers/stripeControllers'

const router = express.Router()

router.post('/create-checkout-session', createSession)

export default router
