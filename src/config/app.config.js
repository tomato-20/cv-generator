const path = require('path')
require('dotenv').config({path: path.join(__dirname , '/../env/.env')});

module.exports = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    TOKEN_SECRET : process.env.TOKEN_SECRET
}