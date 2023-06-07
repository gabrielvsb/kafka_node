const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
})

const producer = kafka.producer()

await producer.connect()
await producer.send({
    topic: 'pedidos',
    messages: [
        { value: 'Hello KafkaJS user!' },
    ],
})

await producer.disconnect()



