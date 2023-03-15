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
router.use(authenticateWebHooks({ secret: process.env.GROWTHBOOK_EVENTS_WEBHOOKS_SECRET }))

router.post('/webhooks', (req, res) => {
  console.log('Receiving request', req.body.toString())

  // Delay in milliseconds to simulate a longer-running request, e.g. 15000 to cause a timeout failure
  // Your web hooks implementation should respond immediately. This delay is added for our QA'ing purposes.
  const delayMs = 0
  setTimeout(() => {
    // Respond first
    res.json({ status: 'all is good'})
  }, delayMs)

  // Handle event
})

module.exports = router
