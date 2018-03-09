let cachedHeaders = new Map()

function getNewHeaders (newHeaders) {
  const newKeys = Object.keys(newHeaders)
  let returnHeadersObject = null
  newKeys.forEach(newKey => {
    if (!cachedHeaders.has(newKey)) {
      if (!returnHeadersObject) {
        returnHeadersObject = {}
      }
      returnHeadersObject[newKey] = newHeaders[newKey]
      cachedHeaders.set(newKey, newHeaders[newKey])
    }
  })
  return returnHeadersObject
}

module.exports = {getNewHeaders}