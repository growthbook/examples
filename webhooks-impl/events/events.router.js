const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

router.use(bodyParser.raw({
  type: 'application/json'
}))

router.post('/feature-created', (req, res) => {
  console.log('Receiving request', req.body)

  // Respond first
  res.json({ status: 'ok'})

  // Handle event
})

router.post('/feature-updated', (req, res) => {
  console.log('Receiving request', req.body)

  // Respond first
  res.json({ status: 'ok'})

  // Handle event
})


module.exports = router
