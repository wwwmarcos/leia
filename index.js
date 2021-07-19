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

const removeScriptList = [
  'estadao'
]

const shouldRemoveScript = url => 
  removeScriptList.some(caseToRemove => url.includes(caseToRemove))

app.get('/', async (req, res) => {
  const { s: siteUrl } = req.query

  if (!siteUrl) {
    return res.send(form)
  }

  const { data } = await axios({
    method: 'GET',
    url: siteUrl,
    headers: {
      'referer': 'https://m.facebook.com/',
      'accept-charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
      'user-agent': 'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25'
    }
  })

  
  if (shouldRemoveScript(siteUrl)) {
    const $ = cheerio.load(data)
    $('script').remove()
    return res.send($.html())
  }

  return res.send(data)
})

app.get('/robots.txt', async (req, res) => {
  const robotsRule = `
  User-agent: *
  Disallow: /
`

  res.send(robotsRule)
})

app.listen(3000, () =>
  console.log('app running on 3000'))
