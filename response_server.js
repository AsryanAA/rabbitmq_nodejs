const express = require('express')
const bodyParser = require('body-parser')
const Consumer = require('./consumer')

const app = express()
const consumer = new Consumer()

app.use(bodyParser.json('application/json'))

app.get('/response_message', async (req, res, next) => {
    const resp = await consumer.readRequestMessage()
    const message = resp.content.toString()
    const result = message * 2
    setTimeout(() => {
        res.send({
            'result': result
        })
    }, 5000)
    consumer.deleteMessage(resp)
})

app.listen(3001, () => {
    console.log('Server start on port: 3001')
})