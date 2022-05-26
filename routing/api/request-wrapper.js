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
 * @returns {[Function]}
 * @type {(rq: IncomingMessage, rs: ServerResponse) => [Function]}
 */
function wrapRequest(rq,rs){

    const originalRequest = rq;
    const {method, url, headers} = rq
    const response = rs;

    const rqId = crypto.randomUUID();

    function getOriginalRequest (){
        return originalRequest;
    }

    function getMethod(){
        return method;
    }

    function getUrl(){
        return url;
    }

    function getHeaders(){
        return headers;
    }

    function requestId (){
        return rqId;
    }

    function ok(resultMessage){
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');

        response.write('<html>');
        response.write('<body>');
        response.write(`<h3>${resultMessage}</h3>`);
        response.write('</body>');
        response.write('</html>');

        response.end();
    }

    function fail(error){
        response.statusCode = 500;
        response.setHeader('Content-Type', 'application/json');
        const responseBody = { headers, method, url, error};
        response.write(JSON.stringify(responseBody));
        response.end();
    }

    return {
        getUrl,
        getMethod,
        getHeaders,
        requestId,
        ok,
        fail
    };
}

module.exports = {
    wrapRequest
}


