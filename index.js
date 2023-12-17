require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const { checkURl } = require('./helpers/validURL')
const createShortId = require('./helpers/shortId')
const URLModel = require('./models/url')

const app = express()

// Connect to database
mongoose.connect(process.env.MONGO_URI)

// CORS
app.use(cors({ optionsSuccessStatus: 200 }))

// Request body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static content
app.use(express.static('public'))

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})


app.post('/api/shorturl', checkURl, async (req, res) => {

  const { url } = req.body

  try {
    let ulrObj = await URLModel.findOne({
      originalURL: url
    })

    if (!ulrObj) {
      ulrObj = new URLModel({
        originalURL: url,
        shortURL: createShortId()
      })

      await ulrObj.save()
    }

    res.status(200).json({
      original_url: ulrObj.originalURL,
      short_url: ulrObj.shortURL
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal error server'
    })
  }
})

app.get('/api/shorturl/:short_url', async (req, res) => {
  const { short_url } = req.params

  try {
    const urlObj = await URLModel.findOne({
      shortURL: short_url
    })

    if (urlObj) {
      return res.redirect(urlObj.originalURL)
    }

    res.status(404).json({
      error: 'URL not found'
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal error server'
    })
  }
})
// listen for requests
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port)
});