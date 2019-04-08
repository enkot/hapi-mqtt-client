'use strict'

const Hapi = require('hapi')

describe('Plugin tests', () => {
    let server

    beforeEach(() => {
        server = Hapi.Server()
    })

    afterEach(async () => {
        await server.stop()
    })

    test('should be able to register plugin with just URL', async () => {
        await server.register({
            plugin: require('../'),
            options: 'mqtt://localhost'
        })
        const { client } = server.mqtt
        expect(client).toBeTruthy()
    })
})
