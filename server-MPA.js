const http = require('http')
const fs = require('fs')
const port = 6300

const index = fs.readFileSync('./index.html', 'utf8')
const root = fs.readFileSync('./root.html', 'utf8')
const store = fs.readFileSync('./store.html', 'utf8')
const checkout = fs.readFileSync('./checkout.html', 'utf8')
const nav = fs.readFileSync('./nav.html', 'utf8')

const requestHandler = (req, res) => {
  if (req.url === '/favicon.ico') {
    return res.end('')
  }
  console.log(req.url, req.method)
  let resHTML = ''
  switch (req.url) {
    case '/':
      resHTML = index.replace('THIS_STRING_WILL_BE_REPLACED', nav + root)
      break;
    case '/store':
      resHTML = index.replace('THIS_STRING_WILL_BE_REPLACED', nav + store)
      break;
    case '/checkout':
      resHTML = index.replace('THIS_STRING_WILL_BE_REPLACED', nav + checkout)
      break;
    case '/submit':
      resHTML = index.replace('THIS_STRING_WILL_BE_REPLACED', nav + root + 'SUCCESSFULL')
      break;
  }
  res.setHeader('content-type', 'text/html; charset=utf-8"');
  res.end(resHTML)
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})