const cheerio = require('cheerio')
const axios = require('axios')

module.exports = async (req, res) => {
  const { site } = req.query

  if (!site) {
    return res.send('kd o site')
  }

  const { data } = await axios(site)
  const $ = cheerio.load(data)

  $('script').remove()

  res.send($.html())
}
