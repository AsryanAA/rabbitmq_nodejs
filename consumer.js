const amqp = require('amqplib')
const config = require('./config')

class Consumer {
    requestChannel

    async createChannel () {
        const connection = await amqp.connect(config.ServerRabbitMQ.host)
        this.requestChannel = await connection.createChannel()
    }

    getMessage() {
        const nameQueue = config.ServerRabbitMQ.nameQueue
        return new Promise((resolve) => {
            this.requestChannel.consume(nameQueue, (res) => {
                resolve(res)
                //this.requestChannel.ack(res)
            })
        })
    }

    async readRequestMessage () {
        if (!this.requestChannel) {
            await this.createChannel()
        }

        //const nameQueue = config.ServerRabbitMQ.nameQueue

        const resp = await this.getMessage()
        //await this.requestChannel.ack(resp)
        //console.log(resp)
        //const message = await this.getMessage().then(res => res.content.toString())
        //await this.getMessage().then(res => this.requestChannel.ack(res))
        
        return resp
    }

    async deleteMessage(channel) {
        this.requestChannel.ack(channel)
    }
}

module.exports = Consumer