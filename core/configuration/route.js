'use strict'

function Route(routeLocation, callMethod, requestHandler){
    const location = routeLocation;
    const method = callMethod;
    const handlers = requestHandler;

    return {
        location,
        method,
        handlers
    }
}

/** just an idea of business logic call signature:
 * @param input Object - the payload which should be processed by the handler
 * @param localContext Object - an object which can store and probably share/store some data
 *                              between different handler calls. It could be any aggregates or counters for example
 * @param globalContext Object - an object which can store and probably share/store some data
 *                              across the whole application. For example, caches
 **/
function emptyCallHandler (input, localContext, globalContext){
    return {
        error: 'not implemented'
    }
}

function routeBuilder (){
    // route path to handle here
    let callPath;

    function location(path){
        callPath = path;
        return this;
    }

    // http method
    let callMethod;

    function method(method){
        callMethod = method;
        return this;
    }

    // a function or an array of functions which process the request payload
    let callHandling;

    function handlers(callHandlers){
        callHandling = callHandlers;
        return this;
    }

    function build(){
        return new Route(
            callPath ?? '/',
            callMethod ?? 'not implemented',
            callHandling ?? emptyCallHandler()
        );
    }

    return {
        location,
        method,
        handlers,
        build
    }

}

module.exports = {
    routeBuilder
}

// Sample usage:
// receiving events
// routeBuilder()
//         .location("/event")
//         .method("post")
//         .handlers(() => {})
//     .build()