const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

router.use(bodyParser.raw({
  type: 'application/json'
}))

router.use(require('./unified-webhooks-authentication-middleware'))

router.post('/', (req, res) => {
  console.log('Receiving request (unified)', JSON.stringify(JSON.parse(req.body.toString()), null, 2))

  // Respond first
  res.json({ status: 'ok'})

  // Handle event
})

module.exports = router