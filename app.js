const http = require('http');
const {Router} = require('./routing');

const hostname = '127.0.0.1';
const port = 3000;

const {mainConfig} = require('./appconf');

const router = Router();

router.loadConfig(mainConfig);

const serveRequests = router.handleRequest;
const server = http.createServer(serveRequests);

server.listen(
    mainConfig.port,
    hostname,
    () => {
        console.log(`started server at http://${hostname}:${port}/`);
    }
);