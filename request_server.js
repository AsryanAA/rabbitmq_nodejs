const express = require('express')
const bodyParser = require('body-parser')
const Producer = require('./producer')

const app = express()
const producer = new Producer()

app.use(bodyParser.json('application/json'))

app.post('/request_message', async (req, res, next) => {
    await producer.publishRequestMessage(req.body.number)
    res.send()
})

app.listen(3000, () => {
    console.log('Server start on port: 3000')
})