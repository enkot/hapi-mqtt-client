# Hapi-MQTT-Client

MQTT-client plugin for Hapi, based on MQTT.js.

## How to use?
```js
'use strict'

const Hapi = require('hapi')
const Boom = require('boom')

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    })

    await server.register({
       plugin: require('hapi-mqtt-client'),
       options: 'mqtt://localhost'
    })

    // or 

    // await server.register({
    //    plugin: require('hapi-mqtt-client'),
    //    options: {
    //        host: 'localhost'
    //    }
    // })

    server.route({
        method: 'POST',
        path:'/message',
        handler: (request, h) => {

            const { client } = request.mqtt
            const { message } = request.payload
            
            try {
                await client.publish('sensors', message)
            }
            catch (err) {
                return Boom.internal('Internal MQTT error', err)
            }
        }
    });

    await server.start()
    console.log('Server running on %ss', server.info.uri)
}

init()
```