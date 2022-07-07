const path = require('path')
require('dotenv').config({path: path.join(__dirname , '/../env/.env')});

module.exports = {
    MONGODB_URI : process.env.MONGO_CONNECTION_STRING
}