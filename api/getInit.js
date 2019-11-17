const resDialogue = require('../lib/responses.json')

module.exports = (req, res) => {
  if (res) {
    res.send(resDialogue.init)
  } else {
    console.log('server error')
  }
}
