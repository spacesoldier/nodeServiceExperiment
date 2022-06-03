'use strict';

const {startyGreeting} = require('./about');
const {loggerBuilder,logLevels} = require('./logging');
const {readAppConfig, loadConfig} = require('./configuration');
const {
        serverBuilder,
        defaultRequestSink,
        methodBuilder,
        endpointBuilder,
        handleRequest,
        webClientBuilder,
        routerBuilder
                    } = require('./api');
const {loadFeatures} = require('./logic');

// configPath is the path to an application configuration file
// which declares all the stuff about ports to listen,
// protocols, endpoints and so on
function applicationStart(configPath) {

    const log = loggerBuilder()
                        .name('starty')
                        .level(logLevels.INFO)
                    .build();

    function startServices(runningServers){
        runningServers.forEach( server => {
            server.start();
        })
    }

    /**
     *
     * @param {string} enpName
     * @param {Object} currEnpDef
     * @returns {*}
     */
    function constructEndpoint(enpName, currEnpDef) {
        let currEnpMethods = [];
        let currEnpMethodsDef = currEnpDef.methods;
        Object.getOwnPropertyNames(currEnpMethodsDef)
            .forEach(methodName => {
                currEnpMethods.push(
                    methodBuilder()
                        .name(methodName.toUpperCase())
                        .handlerName(currEnpMethodsDef[methodName].handler)
                        .build()
                );
            });
        let newEndpoint = endpointBuilder()
                                .name(enpName)
                                .location(currEnpDef.location);
        currEnpMethods.forEach(mtd => newEndpoint.method(mtd));
        return newEndpoint.build();
    }

    function applyConfig(configReadError, configObject){

        if (configReadError !== undefined && configReadError !== null){
            log.error(`Could not start app due to an error: \n ${configReadError}`);
            return {error: configReadError};
        } else {
            let runningServers = [];
            if (configObject !== undefined && configObject !== null){
                const {
                    'app-name': appName,
                    servers
                } = configObject;
                log.info(`Starting ${appName.toUpperCase()}..`);

                for (let serverName in servers){
                    const {
                        hosts,
                        port,
                        protocol,
                        endpoints
                    } = servers[serverName];
                    log.info(`Configuring ${serverName} ${protocol} server on port ${port}..`);

                    let endpointNames = Object.getOwnPropertyNames(endpoints);
                    log.info(`Setting up endpoints: ${endpointNames}`);

                    let endpointsDefinitions = [];
                    endpointNames.forEach((enpName) => {
                        endpointsDefinitions.push(constructEndpoint(enpName, endpoints[enpName]));
                    });


                    let newServer = serverBuilder()
                                                    .host(hosts)
                                                    .port(port)
                                                    .protocol(protocol)
                                                    .endpoints(endpointsDefinitions)
                                                    .handler(handleRequest)
                                    .build();

                    runningServers.push(newServer);
                }
            }

            return {
                servers: runningServers
            };
        }
    }

    let appFeatureStore = {};

    function initSingleRouter(serverDef){
        log.info('beep beep');
        let newRouter = routerBuilder();
        serverDef.exposedEndpoints.forEach(
            serverEndpoint => {
                let {
                    endpointLocation,
                    endpointMethods
                } = serverEndpoint;
                endpointMethods.forEach(
                    method =>{
                        let {
                            methodName,
                            handlerName
                        } = method;
                        let requestHandler = appFeatureStore.featureFunctions[handlerName];

                        newRouter.route(
                            endpointLocation,
                            methodName,
                            requestHandler ?? defaultRequestSink
                        );

                        if (requestHandler === undefined || requestHandler === null){
                            log.error(`Could not find an implementation of ${handlerName} for endpoint ${methodName} : ${endpointLocation}`);
                        }
                    }
                );
            }
        );
        return newRouter.build();
    }

    function initRouters(prevError, serverDefs){
        if (serverDefs !== undefined && serverDefs !== null){
            let routers = [];
            if (Array.isArray(serverDefs)){
                serverDefs.forEach(server => initSingleRouter(server));
            } else {
                initSingleRouter(serverDefs);
            }
            return {servers: serverDefs};
        } else {
            return {error: prevError};
        }
    }

    startyGreeting();

    loadFeatures().then(
        featureStore => {
            appFeatureStore = featureStore;
            featureStore.initializeFeatures();
        }
    ).then(
        () => {
            return readAppConfig(configPath);
        }
    ).then(
        (readConf) => {
            let {error, conf} = readConf;
            return loadConfig(error,conf);
        }
    ).then(
        (parsedConf) => {
            let {error, config} = parsedConf;
            return applyConfig(error,config);
        }
    ).then(
        (applicationState) => {
            let {error, servers} = applicationState;
            return initRouters(error, servers);
        }
    ).then(
        (applicationState) => {
            let {error, servers} = applicationState;
            startServices(servers);
        }
    )
        .catch(
        faultReason => {
            log.error(`cannot start app due to ${faultReason}`);
        }
    );




    return {

    };

}

module.exports = {
    applicationStart
}
