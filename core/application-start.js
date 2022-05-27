'use strict';

const {readAppConfig} = require("./configuration");
const http = require("http");

// This is a prototype of a router which process the requests
// to different paths and applies request handlers
function applicationStart(configPath) {

    function receiveConfig(configReadError, configObject){
        if (configReadError != undefined && configReadError !== null){
            console.log(`Could not start app due to an error: \n ${configReadError}`);
        } else {
            if (configObject != undefined && configObject !== null){
                const {
                    'app-name': appName,
                    servers
                } = configObject;
                console.log(`Starting ${appName.toUpperCase()}..`);
            }
        }
    }

    // configPath is the path to an application configuration file
    // which declares all the stuff about ports to listen,
    // protocols, endpoints and so on

    readAppConfig(configPath, receiveConfig);

    // function start(){
    //     const server = http.createServer(handleRequest);
    //
    //     server.listen(
    //         mainConfig.port,
    //         mainConfig.hostname,
    //         () => {
    //             console.log(`started server at http://${hostname}:${port}/`);
    //         }
    //     );
    // }

    return {

    };

};

module.exports = {
    applicationStart
}
