const http = require('http')
const fs = require('fs')
const port = 6300

const {getNewHeaders} = require('./server-utils.js')

const favicon = fs.readFileSync('./favicon.ico')
const index = fs.readFileSync('./index.html', 'utf8')
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

  // res.setHeader('Content-Type', 'text/html; charset=utf-8"');
  // res.end(resHTML)
  res.end(index)
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})