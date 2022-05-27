'use strict'
const fs = require('fs');
const yaml = require('js-yaml');

function loadConfig (callback) {

    function apply(readError, configFileContents){
        let result = null;

        if (readError != undefined && readError !== null){
            callback(readError, result);
        }

        let error;

        try {
            result = yaml.load(configFileContents);
        } catch (ex){
            error = ex;
            console.log(ex);
        }

        callback(error, result);
    }

    return {
        apply
    };
}

function readAppConfig(config_path, readyCallback){
    try {
        fs.readFile(config_path, loadConfig(readyCallback).apply);
    } catch (error) {
        readyCallback({error})
    }
}

module.exports = {
    readAppConfig
}

