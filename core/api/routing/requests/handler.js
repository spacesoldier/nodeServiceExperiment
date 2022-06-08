'use strict'

const {wrapRequest} = require("./request-wrapper");
const {loggerBuilder, logLevels} = require("../../../logging");

/**
 *
 * @param {function} routerFunction
 */
function routedRequestHandler(name, routerFunction){

    const handlerName = name;
    const findRoute = routerFunction;

    const log = loggerBuilder()
                            .name(handlerName)
                            .level(logLevels.INFO)
                        .build();

    /**
     * Handles an incoming API request.
     * @param {IncomingMessage} [rq]
     * @param {ServerResponse} [rs]
     * @type {(rq:IncomingMessage, rs: ServerResponse) => RequestWrapper}
     * @returns {RequestWrapper}
     */
    function handleRequest (rq, rs){
        let envelope = wrapRequest(rq, rs);

        log.info(`Received ${envelope.getMethod()} request ${envelope.requestId()} to ${envelope.getUrl()}`);

        let {error, handler} = findRoute(envelope.getUrl(), envelope.getMethod());

        if (error !== undefined){
            envelope.fail(404, error)
        } else {
            let callResult = handler();
            envelope.ok(callResult.response);
        }

    }

    return {
        handleRequest
    }
}



module.exports = {
    routedRequestHandler
}
