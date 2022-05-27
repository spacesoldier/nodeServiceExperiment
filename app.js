const http = require('http');
const {Router} = require('./core');
const {mainConfig} = require('./appconf');

const router = Router(mainConfig);

const serveRequests = router.handleRequest;
const server = http.createServer(serveRequests);

server.listen(
    mainConfig.port,
    mainConfig.hostname,
    () => {
        console.log(`started server at http://${hostname}:${port}/`);
    }
);