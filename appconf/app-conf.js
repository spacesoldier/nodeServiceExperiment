'use strict'

const mainConfig = {
    port: 80,
    routes: [
            // serve static content
            {
                path: "/",
                method: "get",
                handler: () => {}
            },

            // session control: request a new session
            {
                path: "/session",
                method: "get",
                handler: () => {}
            },
            // session control: validate an existing session
            {
                path: "session",
                method: "post",
                handler: () => {}
            },
            // session control: validate an existing session
            {
                path: "session",
                method: "delete",
                handler: () => {}
            },

            // receiving events
            {
                path: "/event",
                method: "post",
                handler: () => {}
            },
        ],
}

module.exports = {
    mainConfig
}
