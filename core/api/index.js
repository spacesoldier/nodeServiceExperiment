'use strict'

const {handleRequest} = require('./requests')
const {serverBuilder} = require('./servers/server')

module.exports = {
    serverBuilder,
    handleRequest
}

