'use strict';

const {startyGreeting} = require('./about')
const {readAppConfig} = require('./configuration');
const {serverBuilder} = require('./api/servers')

// This is a prototype of a router which process the requests
// to different paths and applies request handlers
function applicationStart(configPath) {

    startyGreeting();

    const runningServers = [];

    function initializeResources(onReadyCallback){

    }

    function startServices(){
        runningServers.forEach( server => {
            server.start();
        })
    }

    function receiveConfig(configReadError, configObject){
        if (configReadError !== undefined && configReadError !== null){
            console.log(`Could not start app due to an error: \n ${configReadError}`);
        } else {
            if (configObject !== undefined && configObject !== null){
                const {
                    'app-name': appName,
                    servers
                } = configObject;
                console.log(`Starting ${appName.toUpperCase()}..`);

                for (let serverName in servers){
                    const {
                        hosts,
                        port,
                        protocol,
                        endpoints
                    } = servers[serverName];
                    console.log(`\tConfiguring ${serverName} ${protocol} server on port ${port}..`);

                    runningServers.push(
                                        serverBuilder()
                                                .host(hosts)
                                                .port(port)
                                                .protocol(protocol)
                                            .build()
                    );

                    console.log(`\t\tSetting up endpoints: ${Object.getOwnPropertyNames(endpoints)}`);
                }

                startServices();
            }
        }
    }

    // configPath is the path to an application configuration file
    // which declares all the stuff about ports to listen,
    // protocols, endpoints and so on

    readAppConfig(configPath, receiveConfig);

    return {

    };

}

module.exports = {
    applicationStart
}
