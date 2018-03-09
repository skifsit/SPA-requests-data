const http = require('http')
const fs = require('fs')
const port = 6300

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
  console.log(req.url, req.method)
  console.log(JSON.stringify(req.headers))
  if (req.url === '/favicon.ico') {
    return res.end('')
  } else if (req.url === '/script-url') {
    res.setHeader('content-type', 'application/json; charset=utf-8')
    return res.end('{ "key": "value" }')
  } else if (req.url === '/root') {
    res.setHeader('content-type', 'text/html; charset=utf-8')
    return res.end(root)
  } else if (req.url === '/store') {
    res.setHeader('content-type', 'text/html; charset=utf-8')
    return res.end(store)
  } else if (req.url === '/checkout') {
    res.setHeader('content-type', 'text/html; charset=utf-8')
    return res.end(checkout)
  } else if (req.url === '/nav') {
    res.setHeader('content-type', 'text/html; charset=utf-8')
    return res.end(nav)
  } else if (req.url === '/user') {
    res.setHeader('content-type', 'text/html; charset=utf-8')
    return res.end(user)
  }

  // res.setHeader('content-type', 'text/html; charset=utf-8"');
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