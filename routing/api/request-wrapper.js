'use strict'

const crypto = require('crypto');
const { IncomingMessage } = require('_http_incoming');
const {
    STATUS_CODES,
    ServerResponse
} = require('_http_server');



/**
 * Returns a new instance of `RequestWrapper`.
 * @param {IncomingMessage} [rq]
 * @param {ServerResponse} [rs]
 * @param {Function} [requestHandlers]
 * @returns {RequestWrapper}
 * @type {(rq: IncomingMessage, rs: ServerResponse) => RequestWrapper}
 */
function wrapRequest(rq,rs,...requestHandlers){

    const originalRequest = rq;
    const response = rs;

    const rqId = crypto.randomUUID();

    function extractMethod(){
        return rq.method;
    }

    function requestId (){
        return rqId;
    }

    return {
        extractMethod,
        requestId
    };
}

module.exports = {
    wrapRequest
}


