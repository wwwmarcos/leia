const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const form = `
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>paywall bypass</title>
  </head>
  <body>
    <h1>paywall bypass</h1>
    <form action="/" method="get">
      <center>
        <input type="text" name="s" id="s" placeholder="Add url" />
        <button type="submit" aria-label="Get article">Go</button>
      </center>
    </form>
  </body>
</html>
`

app.get('/', async (req, res) => {
  const { s: site } = req.query

  if (!site) {
    return res.send(form)
  }

  const { data } = await axios(site)
  const $ = cheerio.load(data)

  $('script').remove()

  res.send($.html())
})

app.listen(3000, () =>
  console.log('app running on 3000'))
