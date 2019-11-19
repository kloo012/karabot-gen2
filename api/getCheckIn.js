const resDialogue = require('../lib/responses.json')

module.exports = (req, res) => {
  if (res) {
    res.send(resDialogue.long_pause)
  } else {
    console.log('server error')
  }
}
