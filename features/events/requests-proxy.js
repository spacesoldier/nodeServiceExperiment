'use strict'

const {loggerBuilder, logLevels} = require("../../core/logging");
const log = loggerBuilder()
                    .name('proxy service')
                    .level(logLevels.INFO)
                .build();

// function callService(){
//     return {
//         payload: 'beeep'
//     }
// }

/**
 *
 * @param {{ msgId: string,request: {headers: {object}, query: {object}}, response: {object}, payload}} msg
 * @returns {{ msgId: string,request: {headers: {object}, query: {object}}, response: {headers:{object}}, payload:{object}}} msg
 */
function callService(msg){

    //log.info(msg.payload);

    if (msg.request.query !== undefined){
        let queryStr = JSON.stringify(msg.request.query);
        log.info(`query ${queryStr}`);
    }

    let sendSomeData = {
        message: 'call me later',
        phone: '12345678'
    }


    // we do not plan to return a result here
    delete msg.payload;

    // fill a request to external service instead
    msg.googleApiRequest = {
        ...(sendSomeData)
    };

    // and set proper headers for external API request
    // replacing originally received headers
    msg.request = {
        headers: {
            'content-type': 'application/json'
        },
        query: {
            foo: 'bar',
            buzz: 'baz'
        }

    };

    return msg;

}

/**
 *
 * @param {{ msgId: string,request: IncomingMessage, response: ServerResponse, payload}} msg
 * @returns {*}
 */
function onGoogleGetResult(msg){

    log.info(`got the response: ${msg.payload}`);

    return msg;
}

/**
 *
 * @param {{ msgId: string,request: IncomingMessage, response: ServerResponse, payload}} msg
 * @returns {*}
 */
function onGoogleError(msg){
    log.info(`got the error: ${msg.payload}`);

    return msg;



}

module.exports = {
    callService,
    onGoogleGetResult,
    onGoogleError
}

