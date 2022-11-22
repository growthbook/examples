const crypto = require('node:crypto');

const authenticateWebHooks = ({ secret }) => (req, res, next) => {
  console.log('Authenticating webhook request')

  // Get signature from headers
  const signature = req.headers['x-growthbook-signature']

  // Sign the payload
  const computed = crypto
    .createHmac('sha256', secret)
    .update(req.body)
    .digest('hex');

  // Compare signatures using a time-safe compare
  if (!crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signature))) {
    console.error('❗️ Invalid signature')
    return res.status(401).send()
  }
  
  console.log('✅ Signature verified')
  next()
}

module.exports = authenticateWebHooks
