const { request, response } = require('express')

const home = (req = request, res = response) => {
  res.render('index')
}

module.exports = { home }
