const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const URL = require('./models/url.js')
const generateShortUrl = require('./generateShortUrl')
const PORT = process.env.PORT || 3002
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/url'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})
// 設定首頁路由
app.get('/', (req, res) => {
  res.render('index')
})
// 設定送出網址路由
app.post('/', (req, res) => {
  const originalUrl = req.body.url //擷取原始網址
  let shortUrl = generateShortUrl()//短網址產生器
  const hostname = req.hostname
  URL.find()
    .lean()
    .then(urls => {
      const array = []
      urls.forEach(url => array.push(url.shortUrl))
      if (array.includes(shortUrl)) {
        shortUrl = generateShortUrl()
      } URL.create({ shortUrl, originalUrl })
      res.render('success', { shortUrl, originalUrl, hostname, PORT })
    })
    .catch(error => console.log(error))
})
// 轉回原始網址
app.get('/:id', (req, res) => {
  const id = req.params.id
  URL.find({ shortUrl: id })
    .lean()
    .then(thisURL => {
      realURL = thisURL[0].originalUrl
      res.redirect(realURL)
    })
    .catch(error => console.log(error))

})

// 設定 port 
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})