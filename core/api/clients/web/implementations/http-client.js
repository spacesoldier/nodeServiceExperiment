'use strict'
const https = require('http');
const methods = require("../methods");

async function doGet(){

}

async function doPost(){

}

async function doPut(){

}

async function doDelete(){

}

const httpMethods = {
    [methods.GET]: doGet,
    [methods.POST]: doPost,
    [methods.PUT]: doPut,
    [methods.DELETE]: doDelete
}

module.exports = {
    httpMethods
}
