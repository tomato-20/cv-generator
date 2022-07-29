require('dotenv').config();
const cors = require('cors');
const path = require('path');
const express = require('express');

const swaggerUi = require("swagger-ui-express");
const swggerJSDoc = require("swagger-jsdoc");

const indexRouter = require('./modules/indexRouter')
// const ResponseError = require('./helpers/errors');
const databaseHelper = require('./helpers/dbHelper');
const genericErrorHandler = require('./middlewere/genericErrorHandler');

const app = express();

databaseHelper.init(app)

app.options('*',cors());
app.use(cors())

// parse req body 
app.use(express.json());
app.use(express.urlencoded({
  extended : false
}))

// serve html templates view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

// logging request in console
app.use((req,res,next)=>{
  let date = new Date()
  console.log(`${req.method} ${req.url} : ${date}`)
  req.db = app.locals.db;
  next();
})

//dir for template images
app.use( express.static("public"))

//for swagger
// app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1',indexRouter)  

// 404 error
app.use('/*', (req,res,next)=>{
    res.status(404).json({
        message: `Cannot ${req.method}. ${req.originalUrl} Not found`
    })
})

// error handles
app.use(genericErrorHandler)

module.exports = app;





