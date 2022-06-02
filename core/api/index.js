'use strict'

const {handleRequest} = require('./requests');
const {serverBuilder} = require('./servers');
const {methodBuilder,endpointBuilder} = require('./endpoints');
const {webClientBuilder} = require('./clients');

module.exports = {
    serverBuilder,
    methodBuilder,
    endpointBuilder,
    handleRequest,
    webClientBuilder
}

