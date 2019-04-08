'user strict'

const MQTT = require('async-mqtt')

async function register (server, options) {
    const client = MQTT.connect(options)
    const mqtt = { client }

    server.decorate('server', 'mqtt', mqtt)
    server.decorate('request', 'mqtt', mqtt)

    client.on('connect', async () => {
        const {
            protocol, 
            clientId, 
            port, 
            hostname
        } = client._client.options

        server.log(
            ['hapi-mqtt-client', 'info'],
            `MQTT connection created for ${protocol}://${hostname}:${port} with clientId ${clientId}`
        )
    })

    client.on('error', (err) => {
        server.log(['hapi-mqtt-client', 'info'], err.toString())
        throw err
    })

    client.on('offline', () => {
        server.log(['hapi-mqtt-client', 'info'], 'Client offline')
    })

    client.on('close', () => {
        server.log(['hapi-mqtt-client', 'info'], 'Client disconnected')
    })

    client.on('reconnect', () => {
        server.log(['hapi-mqtt-client', 'info'], 'Started reconnection')
    })
}

exports.plugin = {
  register: register,
  pkg: require('../package.json')
}
