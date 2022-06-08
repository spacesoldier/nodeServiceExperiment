'use strict'

function prepareStaticContent(){

}

function serveStatic () {
    return {
        response: `heeeey dude!`
    }
}

module.exports = {
    init: prepareStaticContent,
    serveStatic
}
