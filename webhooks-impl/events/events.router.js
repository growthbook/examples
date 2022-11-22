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
// 🚧 Not yet implemented
// router.use(authenticateWebHooks({ secret: process.env.GROWTHBOOK_EVENTS_WEBHOOKS_SECRET }))

// 🚧 Not yet implemented
/* router.post('/webhooks', (req, res) => {
  console.log('Receiving request', req.body)

  // Respond first
  res.json({ status: 'ok'})

  // Handle event
})
 */
module.exports = router
