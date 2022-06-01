'use strict'

const {handleRequest} = require('./requests')
const {serverBuilder} = require('./servers/server')
const {methodBuilder,endpointBuilder} = require('./endpoints');

module.exports = {
    serverBuilder,
    methodBuilder,
    endpointBuilder,
    handleRequest
}

