'use strict'
const fs = require('fs');
const yaml = require('js-yaml');

function loadConfig (readError, configFileContents) {

        let config;

        if (readError != undefined && readError !== null){
            return {
                error: readError
            };
        }

        let error;

        try {
            config = yaml.load(configFileContents);
        } catch (ex){
            error = ex;
            console.log(ex);
        }

        return {
            error,
            config
        };

}

// function readAppConfig(config_path, readyCallback){
//     try {
//         fs.readFile(config_path, loadConfig(readyCallback).apply);
//     } catch (error) {
//         readyCallback({error})
//     }
// }

async function readAppConfig(config_path){
    try {
        const data = await fs.promises.readFile(config_path);
        return {conf: Buffer.from(data)};
    } catch (err) {
        return {error: err};
    }
}

module.exports = {
    readAppConfig,
    loadConfig
}

