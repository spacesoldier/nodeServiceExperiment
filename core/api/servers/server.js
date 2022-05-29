'use strict'
const http = require("http");

/**
 *
 * @param {string} host
 * @param {number} port
 * @param protocol
 * @param {Function} rqHandler
 * @returns {{start: start}}
 * @constructor
 */
function Server(host, port, protocol, rqHandler){

    const serverHostname = host;
    const portToListen = port;
    const requestHandler = rqHandler;

    const serverInstances = [];

    function onServerStart(){
        console.log(`started server at http://${serverHostname}:${portToListen}/`);
    }

    /**
     *
     * @param {string} hostName
     */
    function initializeSingleServer (hostName){
        let newServerInstance = http.createServer(requestHandler);
        newServerInstance.listen(
            portToListen,
            hostName,
            onServerStart
        );
        serverInstances.push(newServerInstance);
    }

    /**
     *
     * @param {Array|string} hostnames
     */
    function initializeMultipleServers (hostnames){
        hostnames.forEach( hostname => {
            initializeSingleServer(hostname);
        });
    }

    function start() {
        if (Array.isArray(serverHostname)) {
            initializeMultipleServers(serverHostname);
        } else {
            initializeSingleServer(serverHostname);
        }
    }

    return {
        start
    }

}

/**
 * Returns a new instance of `RequestWrapper`.
 * @param {IncomingMessage} [rq]
 * @param {ServerResponse} [rs]
 * @returns void
 * @type {(rq: IncomingMessage, rs: ServerResponse) => void}
 */
function defaultRequestSink(rq, rs){
    rs.statusCode = 501;
    rs.setHeader('Content-Type', 'text/html');

    rs.write('<html lang="en">');
    rs.write('<body>');
    rs.write(`<h3>Logic not implemented yet..</h3>`);
    rs.write('</body>');
    rs.write('</html>');

    rs.end();
}

function serverBuilder(){

    let hostName;
    function host(hostname){
        hostName = hostname;

        return this;
    }

    let portNumber;
    function port(listenPort){
        portNumber = listenPort;

        return this;
    }

    let srvProtocol;
    function protocol(serverProtocol){
        srvProtocol = serverProtocol;

        return this;
    }

    let requestSink;
    /**
     * @param requestHandler Function
     */
    function handler(requestHandler){
        requestSink = requestHandler;

        return this;
    }

    function build(){
        return new Server(
            hostName ?? '127.0.0.1',
            portNumber ?? 80,
            srvProtocol ?? 'http',
            requestSink ?? defaultRequestSink
        );
    }

    return {
        host,
        port,
        protocol,
        handler,
        build
    }

}


module.exports = {
    serverBuilder
}
