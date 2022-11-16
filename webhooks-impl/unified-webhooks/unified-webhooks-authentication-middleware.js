const authenticateWebHooks = (req, res, next) => {
  console.log('Authenticating unified webhooks')
  
  next()
}

module.exports = authenticateWebHooks
