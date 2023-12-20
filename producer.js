const amqp = require('amqplib')
const config = require('./config')

class Producer {
    requestChannel

    async createChannel () {
        const connection = await amqp.connect(config.ServerRabbitMQ.host)
        this.requestChannel = await connection.createChannel()
    }

    async publishRequestMessage (requestMessage) {
        if (!this.requestChannel) {
            await this.createChannel()
        }

        const nameQueue = config.ServerRabbitMQ.nameQueue

        //await this.requestChannel.assertExchange(name, 'requestQueue')
        console.log(nameQueue)

        await this.requestChannel.assertQueue(nameQueue)
        this.requestChannel.sendToQueue(nameQueue, Buffer.from(requestMessage.toString()))

        //await this.requestChannel.publish(name, requestMessage)
        //await this.requestChannel.close()
    }
}

module.exports = Producer