const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
})

const producer = kafka.producer()


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('views/index.html', {root: __dirname })
})

app.post('/', async function (req, res) {
    let dados = req.body;
    dados.status = 'CONFIRMADO';

    await producer.connect()
    await producer.send({
        topic: 'pedidos',
        messages: [
            {value: JSON.stringify(req.body)},
        ],
    })

    await producer.disconnect()

    res.sendFile('views/index.html', {root: __dirname })
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})
