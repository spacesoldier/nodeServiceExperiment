'use strict'

const {handleRequest} = require('./requests');
const {serverBuilder, defaultRequestSink} = require('./servers');
const {methodBuilder,endpointBuilder} = require('./endpoints');
const {webClientBuilder} = require('./clients');
const {routerBuilder} = require('./routing');

module.exports = {
    serverBuilder,
    defaultRequestSink,
    methodBuilder,
    endpointBuilder,
    handleRequest,
    webClientBuilder,
    routerBuilder
}

