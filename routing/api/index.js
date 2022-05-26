'use strict'

const wrap = require('./request-wrapper')
const wrapRequest = wrap.wrapRequest;
const RequestWrapper = wrap.RequestWrapper;


module.exports = {
    RequestWrapper,
    wrapRequest
}

