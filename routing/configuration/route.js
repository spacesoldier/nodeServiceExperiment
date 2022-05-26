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

function emptyCallHandler (input, localContext, globalContext){
    return {
        error: 'not implemented'
    }
}

function routeBuilder (){

    let callPath;

    function location(path){
        callPath = path;
        return this;
    }

    let callMethod;

    function method(method){
        callMethod = method;
        return this;
    }

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
