'use strict'

const {routeBuilder} = require('../core/configuration')

const mainConfig = {
    hostname: '127.0.0.1',
    port: 80,
    endpoints: [
            // serve static content
            routeBuilder()
                    .location("/")
                    .method("get")
                    .handlers(() => {})
                .build(),

            // session control: request a new session
            routeBuilder()
                    .location("/session")
                    .method("get")
                    .handlers(() => {})
                .build(),
            // session control: validate an existing session
            routeBuilder()
                    .location("/session")
                    .method("post")
                    .handlers(() => {})
                .build(),

            // session control: terminate an existing session
            routeBuilder()
                    .location("/session")
                    .method("delete")
                    .handlers(() => {})
                .build(),

            // receiving events
            routeBuilder()
                .location("/event")
                .method("post")
                .handlers(() => {})
            .build(),
        ],
}

module.exports = {
    mainConfig
}
