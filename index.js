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
    <title>leia</title>
  </head>
  <body>
    <center>
      <h1>this is not a paywall bypass</h1>
      <form action="/" method="get">
        <input type="text" name="s" id="s" placeholder="Add url" autofocus />
        <button type="submit" aria-label="Get article">Go</button>
      </form>
    </center>
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
