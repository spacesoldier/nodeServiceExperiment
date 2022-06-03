'use strict'

const {routeNodeBuilder} = require('./nodes');

// This is a prototype of a router which process the requests
// to different paths and applies request handlers
function Router(){

    const routeTree = routeNodeBuilder()
                            .name('root')
                        .build();

    /**
     *
     * @param {string} path
     * @param {string} method
     * @param {Function} requestHandler
     */
    function addRoute(path, method, requestHandler){
        routeTree.addHandler(path, method, requestHandler);
    }

    return {
        addRoute
    }
}

function routerBuilder(){
    let endpoints = [];

    /**
     *
     * @param {string} path
     * @param {string} method
     * @param {Function} handler
     */
    function route(path, method, handler){
        endpoints.push({path,method,handler});
    }

    function build(){
        const newRouter = new Router();

        endpoints.forEach(
            endpoint => {
                let {path, method, handler} = endpoint;
                newRouter.addRoute(path,method,handler);
            }
        )

        return newRouter;
    }

    return {
        route,
        build
    }
}


module.exports = {
    routerBuilder
}

