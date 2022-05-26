const http = require('http');
const {Router} = require('./routing');
const {mainConfig} = require('./appconf');

const hostname = '127.0.0.1';
const port = mainConfig.port;

const router = Router();

router.loadConfig(mainConfig);

const serveRequests = router.handleRequest;
const server = http.createServer(serveRequests);

server.listen(
    port,
    hostname,
    () => {
        console.log(`started server at http://${hostname}:${port}/`);
    }
);