'use strict'

const {wrapRequest} = require("./request-wrapper");

/**
 * Handles an incoming API request.
 * @param {IncomingMessage} [rq]
 * @param {ServerResponse} [rs]
 * @type {(rq:IncomingMessage, rs: ServerResponse) => RequestWrapper}
 * @returns {RequestWrapper}
 */
function handleRequest (rq, rs){
    let envelope = wrapRequest(rq, rs);

    console.log(`Received ${envelope.getMethod()} request ${envelope.requestId()} to ${envelope.getUrl()}`);

    envelope.ok(`hello from router! your ticket is ${envelope.requestId()}`);
}

module.exports = {
    handleRequest
}
