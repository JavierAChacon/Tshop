import express from 'express'

const router = express.Router()

router.route('/').get((req, res): void => {
  res.json({
    msg: 'from api/products'
  })
})

export default router
