'use strict'

const { IncomingMessage } = require('_http_incoming');
const {
    STATUS_CODES,
    ServerResponse
} = require('_http_server');

/**
 * @Class
 * @constructor
 */
function RequestWrapper(){

}


/**
 * Returns a new instance of `RequestWrapper`.
 * @param {IncomingMessage} [rq]
 * @param {ServerResponse} [rs]
 * @param {Function} [requestHandler]
 * @returns {RequestWrapper}
 * @type {(rq: IncomingMessage, rs: ServerResponse) => RequestWrapper}
 */
function wrapRequest(rq,rs,requestHandler){
    return new RequestWrapper();
}

module.exports = {
    wrapRequest
}


