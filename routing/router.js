'use strict';

const api = require('./api')

// This is a prototype of a router which process the requests
// to different paths and applies request handlers
function Router() {

    // Here we store the key-value pairs where
    // the key is a string and the value is a request handler
    // Each pair represents a path-to-handler function mapping
    let config = {};

    // receives the config and builds the
    function loadConfig (config) {
        console.log(config);
    }

    /**
     * Handles an incoming API request.
     * @param {IncomingMessage} [rq]
     * @param {ServerResponse} [rs]
     * @type {(rq:IncomingMessage, rs: ServerResponse) => RequestWrapper}
     * @returns {RequestWrapper}
     */
    function handleRequest (rq, rs){
        let envelope = api.wrapRequest(rq, rs, () => {});
        console.log(envelope);
    }

    return {
        loadConfig,
        handleRequest
    };

};

module.exports = {
    Router
}
