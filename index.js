const httpProxy = require('http-proxy')
const fs = require('fs')

require('dotenv').config()

httpProxy
  .createServer({
    target: {
      host: process.env.TARGET_HOST || 'localhost',
      port: process.env.TARGET_PORT || 8000,
    },
    ssl: {
      key: fs.readFileSync('server.key', 'utf8'),
      cert: fs.readFileSync('server.cert', 'utf8'),
    },
  })
  .listen(process.env.PROXY_PORT || 8003)
