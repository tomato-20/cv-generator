
((databaseHelper) => {
    
    'use strict';
    
    const { MongoClient, ServerApiVersion } = require('mongodb');
    
    const dbConfig = require('../config/db.config.js')
    const uri = dbConfig.MONGODB_URI;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    databaseHelper.init = app => {

        client.connect(err => {

            if (err) console.log("Database Connection Error", err)

            // const collection = client.db("test").collection("devices");
            app.locals.db = client.db("cv-template");

            // perform actions on the collection object
            console.log("Database Connection Success")

        })
    }

    databaseHelper.close = app => {
        client.close(err => {
            if (err) {
                console.log('Error closing database', err);
            }
            console.log('Db closed')
        })
    }
})(module.exports);