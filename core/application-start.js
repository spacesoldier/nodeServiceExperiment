'use strict';

const {startyGreeting} = require('./about')
const {readAppConfig} = require('./configuration');
const {
        serverBuilder,
        methodBuilder,
        endpointBuilder,
        handleRequest
                    } = require('./api');
const {loadFeatures} = require('./logic');

// configPath is the path to an application configuration file
// which declares all the stuff about ports to listen,
// protocols, endpoints and so on
function applicationStart(configPath) {

    const runningServers = [];

    async function initializeResources(){
        return {};
    }

    function startServices(){
        runningServers.forEach( server => {
            server.start();
        })
    }

    function applyConfig(configReadError, configObject){
        if (configReadError !== undefined && configReadError !== null){
            console.log(`Could not start app due to an error: \n ${configReadError}`);
        } else {
            if (configObject !== undefined && configObject !== null){
                const {
                    'app-name': appName,
                    servers
                } = configObject;
                console.log(`[${Date()}] Starting ${appName.toUpperCase()}..`);

                for (let serverName in servers){
                    const {
                        hosts,
                        port,
                        protocol,
                        endpoints
                    } = servers[serverName];
                    console.log(`[${Date()}] Configuring ${serverName} ${protocol} server on port ${port}..`);

                    let endpointNames = Object.getOwnPropertyNames(endpoints);
                    let endpointsDefinitions = [];

                    console.log(`[${Date()}] Setting up endpoints: ${endpointNames}`);

                    endpointNames.forEach((enpName) => {
                        let currEnpDef = endpoints[enpName];
                        let currEnpMethods = [];
                        let currEnpMethodsDef = currEnpDef.methods;
                        Object.getOwnPropertyNames(currEnpMethodsDef)
                            .forEach( methodName => {
                                currEnpMethods.push(
                                    methodBuilder()
                                        .name(methodName.toUpperCase())
                                        .handlerName(currEnpMethodsDef[methodName].handler)
                                        .build()
                                );
                            });
                        let newEndpoint = endpointBuilder()
                                            .name(enpName)
                                            //.name(enpName.replaceAll('-','_'))
                                            .location(currEnpDef.location);
                        currEnpMethods.forEach( mtd => newEndpoint.method(mtd));
                        newEndpoint = newEndpoint.build();

                        endpointsDefinitions.push(newEndpoint);
                    });


                    let newServer = serverBuilder()
                                                    .host(hosts)
                                                    .port(port)
                                                    .protocol(protocol)
                                                    .handler(handleRequest)
                                    .build();

                    runningServers.push(newServer);


                }
            }
        }
    }

    // the entrypoint of our application now looks like this
    startyGreeting()
        .then(() => readAppConfig(configPath, applyConfig))
        .then(() => loadFeatures())
        .then(() => initializeResources())
        .then(() => startServices())
        .catch(
                faultReason => {
                                    console.log(`cannot start app due to ${faultReason}`);
                                }
            )



    return {

    };

}

module.exports = {
    applicationStart
}
