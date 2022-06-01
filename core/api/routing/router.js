'use strict'

// This is a prototype of a router which process the requests
// to different paths and applies request handlers
function Router(){

    return {

    }
}

function routerBuilder(){

    function build(){
        return new Router();
    }

    return {
        build
    }
}


module.exports = {
    routerBuilder
}

