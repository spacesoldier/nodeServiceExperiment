'use strict'

const crypto = require('crypto');
const { IncomingMessage } = require('_http_incoming');
const {
    STATUS_CODES,
    ServerResponse
} = require('_http_server');


/**
 *
 * @param rq
 * @param rs
 * @returns {{getUrl: (function(): *), fail: fail, getHeaders: (function(): *), requestId: (function(): string), getMethod: (function(): *), ok: ok}}
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

    function ok(resultMessage, contentType='text/html'){
        response.statusCode = 200;
        response.setHeader('Content-Type', contentType);

        response.write('<html>');
        response.write('<body>');
        response.write(`<h3>${resultMessage}</h3>`);
        response.write('</body>');
        response.write('</html>');

        response.end();
    }

    function fail(statusCode, error, contentType='application/json'){
        response.statusCode = statusCode;
        response.setHeader('Content-Type', contentType);
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


