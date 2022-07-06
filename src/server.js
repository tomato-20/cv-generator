const http = require('http');
const  app = require('./app');
const path = require('path')

require('dotenv').config({path:path.normalize(__dirname + '/env/.env')});

const port = process.env.PORT;
const host = process.env.HOST;

const server = http.createServer(app);

server.listen(port,host,()=>{
    console.log(`listening on http://${host}:${port}`)
})
