'use strict'

function prepareStaticContent(){

}

let dudeCount = 0;

/**
 *
 * @param {{ msgId: string,request: IncomingMessage, response: ServerResponse, payload}} msg
 * @returns {*}
 */
function serveStatic (msg) {

    let {response} = msg;

    response.setHeader('Content-Type', 'text/plain');


    dudeCount += 1;

    msg.payload = `heeeey dude! ${dudeCount}`;

    return msg;
}

module.exports = {
    init: prepareStaticContent,
    serveStatic
}
