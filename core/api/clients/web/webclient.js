'use strict'

const {httpMethods, httpsMethods} = require('./implementations');
const protocols = require('./protocols');

const clientImplementations = {
    [protocols.HTTP] : httpMethods,
    [protocols.HTTPS] : httpsMethods
}

/**
 *
 * @param {string} baseUrl
 * @returns {{basePath, urlToCall, callMethods}}
 */

function webClient(baseUrl) {
    const urlToCall = baseUrl;
    const urlParts = baseUrl.split('//');

    const protocol = urlParts[0].toLowerCase();

    const implementation = clientImplementations[protocol];

    /**
     *
     * @param {CallRequest} callRequest
     * @returns {Promise<void>}
     */
    async function call (callRequest){
        let {method} = callRequest;
        if (implementation !== undefined){
            if (method in implementation){
                console.log(`Bingo!!! We'll call ${baseUrl} with ${method} `);
            }
        }

    }

    return {
        urlToCall,
        protocol,
        call
    }
}

function webClientBuilder(){
    let clientUrl;
    function url(baseUrl){
        clientUrl = baseUrl;
        return this;
    }

    function build(){
        return new webClient(
            clientUrl
        );
    }

    return {
        url,
        build
    }
}

module.exports = {
    webClientBuilder
}
