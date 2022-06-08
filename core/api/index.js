'use strict'

const {initServers, startServices} = require('./servers');
const {extractEndpoints} = require('./endpoints');
const {webClientBuilder, initClients} = require('./clients');
const {routerBuilder, initRouters} = require('./routing');

module.exports = {
    extractEndpoints,
    webClientBuilder,
    initClients,
    routerBuilder,
    initRouters,
    initServers,
    startServices
}

