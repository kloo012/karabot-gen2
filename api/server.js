// require('dotenv').config()
// const express = require('express')
// const cors = require('cors')
// const bodyParser = require('body-parser')
// const { Wit, log } = require('node-wit')
// const { interactive } = require('node-wit')

// const port = process.env.PORT || 3001
// const resDialogue = require('../lib/responses.json')

// const app = express()
// app.use(cors())

// const client = new Wit({
//   accessToken: process.env.WITAPI_TOKEN,
//   logger: new log.Logger(log.DEBUG),
// })

// interactive(client)

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

// const getEntityVal = (entities, entity) => {
//   const val =
//     entities &&
//     entities[entity] &&
//     Array.isArray(entities[entity]) &&
//     entities[entity].length > 0 &&
//     entities[entity][0].value

//   if (!val) {
//     return null
//   }

//   return typeof val === 'object' ? val.value : val
// }

// const handleMessage = ({ entities }) => {
//   const status = getEntityVal(entities, 'intent')
//   const greeting = getEntityVal(entities, 'greetings')

//   if (status) {
//     return resDialogue[status]
//   }
//   if (greeting) {
//     return resDialogue.greeting
//   }

//   return resDialogue.unknown
// }

// app.get('/api/getInit', (req, res) => {
//   if (res) {
//     console.log('hit init')
//     res.send(resDialogue.init)
//   } else {
//     console.log('server error')
//   }
// })

// app.post('/api/post', (req, res) => {
//   console.log(`Posted to Express server: ${req.body.post}`)
//   client
//     .message(req.body.post, {})
//     .then(data => {
//       console.log(`Yay, got Wit.ai response: ${JSON.stringify(data)}`)
//       res.send(handleMessage(data))
//     })
//     .catch(console.error)
// })

// app.listen(port, () => console.log(`Listening on port ${port}`))


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
