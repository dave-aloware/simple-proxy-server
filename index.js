const httpProxy = require('http-proxy')
const fs = require('fs')

require('dotenv').config()

const PROXY_PORT = process.env.PROXY_PORT || 8003
const TARGET_HOST = process.env.TARGET_HOST || 'localhost'
const TARGET_PORT = process.env.TARGET_PORT || 8000
const SSL_KEY_PATH = process.env.SSL_KEY_PATH || 'server.key'
const SSL_CERT_PATH = process.env.SSL_CERT_PATH || 'server.cert'

const server = httpProxy
  .createServer({
    target: {
      host: TARGET_HOST,
      port: TARGET_PORT,
    },
    ssl: {
      key: fs.readFileSync(SSL_KEY_PATH, 'utf8'),
      cert: fs.readFileSync(SSL_CERT_PATH, 'utf8'),
    },
  })
  .listen(PROXY_PORT)

server.once('start', () => {
  console.log('Server started at port ' + PROXY_PORT)
})
