'use strict'

const {readAppConfig,loadConfig} = require('./config');
const {routeBuilder} = require('./route')

module.exports = {
    routeBuilder,
    readAppConfig,
    loadConfig
}