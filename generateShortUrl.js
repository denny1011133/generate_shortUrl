function generateShortUrl() {
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
  const upperCase = lowerCase.toUpperCase()
  const number = '0123456789'
  const collection = lowerCase + upperCase + number
  let output = ''
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * collection.length)
    output += collection.charAt(index)
  }
  return output
}
module.exports = generateShortUrl