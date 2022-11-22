const express = require('express')
const bodyParser = require('body-parser')
const authenticateWebHooks = require('../middleware/authenticateWebHooks')

const router = express.Router()

// Middleware
// 1. use the raw bodyParser
router.use(bodyParser.raw({
  type: 'application/json'
}))
// 2. verify web hook signature
router.use(authenticateWebHooks({ secret: process.env.GROWTHBOOK_SDK_WEBHOOKS_SECRET }))

router.post('/', (req, res) => {
  console.log('Receiving SDK Endpoint webhook request', JSON.stringify(JSON.parse(req.body.toString()), null, 2))

  // Respond first
  res.json({ status: 'ok'})

  // Handle event
})

module.exports = router
