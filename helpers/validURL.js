const dns = require('dns')

const isValidURL = (url = '', callback) => {
  try {
    const urlObj = new URL(url)
    dns.lookup(urlObj.hostname, (err) => {
      if (err) {
        callback(false)
        return false
      } else {
        callback(true)
        return true
      }
    })
  } catch (error) {
    callback(false)
    return false
  }
}

// Middleware
const checkURl = (req, res, next) => {
  const { url } = req.body
  const httpRegex = /^(http|https)(:\/\/)/
  if (!httpRegex.test(url)) {
    return res.json({ error: 'invalid url' })
  }
  isValidURL(url, async (isValid) => {
    if (!isValid) {
      return res.status(400).json({
        error: 'invalid url'
      })
    }
    next()
  })
}

module.exports = {
  isValidURL,
  checkURl
}