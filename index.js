const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const form = `
<form action="/" method="get">
  <center>
    <h1>paywall bypass</h1>
    <input type="text" name="s" id="s" placeholder="url" autofocus />
    <button type="submit">go</button>
  </center>
</form>
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
