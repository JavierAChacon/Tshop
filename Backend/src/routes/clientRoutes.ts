import { Router } from 'express'
import { getLaptops } from '../controllers/adminControllers'

const router = Router()

router.get('/laptops', getLaptops)


export default router
