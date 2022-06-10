'use strict'

const {loggerBuilder, logLevels} = require("../../core/logging");
const log = loggerBuilder()
                    .name('proxy service')
                    .level(logLevels.INFO)
                .build();

/**
 *
 * @param {{ msgId: string,request: IncomingMessage, response: ServerResponse, payload}} msg
 * @returns {*}
 */
function callService(msg){

    log.info(msg.payload);

    let sendSomeData = {
        message: 'call me later',
        phone: '12345678'
    }

    msg.googleApiRequest = {
        headers: {
            'content-type': 'application/json'
        },
        requestBody: JSON.stringify(sendSomeData)
    };

    delete msg.payload;

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

