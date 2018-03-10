const http = require('http')
const fs = require('fs')
const port = 6300
const { URLSearchParams } = require('url')

const {getNewHeaders} = require('./server-utils.js')

const favicon = fs.readFileSync('./favicon.ico')
const index = fs.readFileSync('./index-SPA.html', 'utf8')
// let resHTML = index.replace('THIS_STRING_WILL_BE_REPLACED')

const root = fs.readFileSync('./root.html', 'utf8')
const store = fs.readFileSync('./store.html', 'utf8')
const checkout = fs.readFileSync('./checkout.html', 'utf8')
const nav = fs.readFileSync('./nav.html', 'utf8')
const user = fs.readFileSync('./user.html', 'utf8')

// resHTML = resHTML.replace('>nav<', '>' + nav + '<')
// resHTML = resHTML.replace('>root<', '>' + root + '<')
// resHTML = resHTML.replace('>store<', '>' + store + '<')
// resHTML = resHTML.replace('>checkout<', '>' + checkout + '<')

const requestHandler = (req, res) => {
  if (req.url === '/favicon.ico') {
    res.setHeader('Content-Type', 'image/x-icon; binary')
    return res.end(favicon)
  }
  console.log(req.url, req.method)
  const newHeaders = getNewHeaders(req.headers)
  if (newHeaders) {
    console.log(newHeaders)
  }
  if (req.method === 'GET') {
    if (req.url === '/script-url') {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      return res.end('{ "key": "value" }')
    } else if (req.url === '/root') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      return res.end(root)
    } else if (req.url === '/store') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      return res.end(store)
    } else if (req.url === '/checkout') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      return res.end(checkout)
    } else if (req.url === '/nav') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      return res.end(nav)
    } else if (req.url === '/user') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      return res.end(user)
    }
    res.end(index)
  } else if (req.method === 'POST') {
    switch (req.url) {
      case '/submit':
        let fullData = ''
        const reqContentType = req.headers['content-type']
        const isFormURL = reqContentType === 'application/x-www-form-urlencoded'
        req.on('data', (chunk) => {
          if (isFormURL) {
            fullData += chunk.toString()
          }
        })
        req.on('end', () => {
          if (isFormURL) {
            const searchParamsURL = new URLSearchParams(fullData)
            console.log(searchParamsURL)
          }
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({
            message: 'DONE!'
          }))
        })
        break;
    }
  }

  // res.setHeader('Content-Type', 'text/html; charset=utf-8"');
  // res.end(resHTML)
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})