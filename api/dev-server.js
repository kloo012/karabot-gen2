const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { Wit, log, interactive } = require('node-wit')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const app = express()
app.use(cors())
const port = process.env.PORT || 5000

const resDialogue = require('../lib/responses.json')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const client = new Wit({
  accessToken: process.env.WITAPI_TOKEN,
  logger: new log.Logger(log.DEBUG),
})

interactive(client)

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

app.get('/api/getInit', (req, res) => {
  if (res) {
    console.log('hit init')
    res.send({
      response: resDialogue.init.response,
    })
  } else {
    console.log('server error')
  }
})

app.get('/api/getCheckIn', (req, res) => {
  if (res) {
    res.send(resDialogue.long_pause)
  } else {
    console.log('server error')
  }
})

app.post('/api/postMsg', (req, res) => {
  console.log(`Posted to server: ${req.body.post}`)
  client
    .message(req.body.post, {})
    .then(data => {
      console.log(`Yay, got Wit.ai response: ${JSON.stringify(data)}`)
      res.send(handleMessage(data))
    })
    .catch(err => {
      res.send(`${err}`)
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`))
