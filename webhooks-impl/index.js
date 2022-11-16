const express = require('express')
const morgan = require('morgan')

const app = express()
const port = 1115


app.use(morgan('combined'))

// :: NEW :: Event-based web hooks
app.use('/events', require('./events/events.router'))

// v1 Combined Web hooks handling
app.use('/webhooks', require('./unified-webhooks/unified.router'))

app.listen(port, () => {
  console.log(`Example webhook handling app running at http://localhost:${port}`)
})