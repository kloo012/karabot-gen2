const { Wit, log, interactive } = require('node-wit')
const resDialogue = require('../lib/responses.json')

console.log('hit post')

const client = new Wit({
  accessToken: process.env.WITAPI_TOKEN,
  logger: new log.Logger(log.DEBUG),
})

// interactive(client)

const getEntityVal = (entities, entity) => {
  const val =
    entities &&
    entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value

  if (!val) {
    return null
  }

  return typeof val === 'object' ? val.value : val
}

const handleMessage = ({ entities }) => {
  const status = getEntityVal(entities, 'intent')
  const greeting = getEntityVal(entities, 'greetings')

  if (status) {
    return resDialogue[status]
  }
  if (greeting) {
    return resDialogue.greeting
  }

  return resDialogue.unknown
}

module.exports = (req, res) => {
  console.log(`Posted to server: ${req.body.post}`)
  client
    .message(req.body.post, {})
    .then(data => {
      console.log(`Yay, got Wit.ai response: ${JSON.stringify(data)}`)
      res.send(handleMessage(data))
    })
    .catch(err => res.send(`${err}`))
}
