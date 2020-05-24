//短網址產生器
function generateShortUrl() {
  const collection = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789'
  let output = ''
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * collection.length)
    output += collection.charAt(index)
  }
  return output
}

module.exports = generateShortUrl