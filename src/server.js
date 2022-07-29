const http = require('http');
const  app = require('./app');
const path = require('path');
const swaggerUi = require("swagger-ui-express");
const swggerJSDoc = require("swagger-jsdoc");

require('dotenv').config({path:path.normalize(__dirname + '/env/.env')});

const port = process.env.PORT;
const host = process.env.HOST;

const server = http.createServer(app);

server.listen(port,host,()=>{
    console.log(`listening on http://${host}:${port}`)
})
