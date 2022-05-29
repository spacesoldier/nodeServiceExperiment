'use strict'

/**
 *
 * @param {string} url
 * @param {string} base
 * @param methods
 * @returns {{basePath, urlToCall, callMethods}}
 */

function webClient(url, base, methods) {
    const urlToCall = url;
    const basePath = base;
    const callMethods = methods;

    const urlParts = url.split('//');



    return {
        urlToCall,
        basePath,
        callMethods
    }
}

function webClientBuilder(){
    function baseUrl(baseUrl){

    }

    return {
        baseUrl
    }
}

module.exports = {

}
