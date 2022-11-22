const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')

const app = express()
const port = 1115

dotenv.config()
if (!process.env.GROWTHBOOK_SDK_WEBHOOKS_SECRET) throw new Error('GROWTHBOOK_SDK_WEBHOOKS_SECRET required')


app.use(morgan('combined'))

// 🚧 :: NEW :: Event-based web hooks
// app.use('/events', require('./events/events.router'))

// v1 SDK Endpoint web hook handling
app.use('/webhooks', require('./sdk-endpoints-webhooks/sdk-endpoints-webhooks.router'))

app.listen(port, () => {
  console.log(`Example webhook handling app running at http://localhost:${port}`)
})
