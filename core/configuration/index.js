'use strict'

const {readAppConfig} = require('./config');
const {routeBuilder} = require('./route')

module.exports = {
    routeBuilder,
    readAppConfig
}