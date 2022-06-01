'use strict'

const {RequestMethod} = require('./call-request');

/**
 *
 * @param {string} baseUrl
 * @returns {{basePath, urlToCall, callMethods}}
 */

function webClient(baseUrl) {
    const urlToCall = baseUrl;
    const urlParts = baseUrl.split('//');

    const protocol = urlParts[0].toLowerCase();

    function doGet(){

    }

    function doPost(){

    }

    function doPut(){

    }

    function doDelete(){

    }

    // const calls = {
    //     RequestMethod.GET : doGet,
    //     RequestMethod.POST: doPost,
    //     RequestMethod.PUT: doPut,
    //     RequestMethod.DELETE: doDelete
    // };

    /**
     *
     * @param {CallRequest} callRequest
     * @returns {Promise<void>}
     */
    async function call (callRequest){
        let {method} = callRequest;
        if (Object.hasOwnProperty(method)){
            console.log(`Bingo!!! We'll call ${baseUrl} with ${method} `);
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
            clientUrl,
            methods
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
