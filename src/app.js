require('dotenv').config();
const cors = require('cors');
const express = require('express');

const databaseHelper = require('./helpers/dbHelper')
const genericErrorHandler = require('./middlewere/genericErrorHandler');

const app = express();

databaseHelper.init(app);

app.options('*',cors());
app.use(cors())

// parse req body 
app.use(express.json());
app.use(express.urlencoded({
  extended : false
}))

// logging request in console
app.use((req,res,next)=>{
  let date = new Date()
  console.log(`${req.method} ${req.url} : ${date}`)
  req.db = app.locals.db;
  next();
})

app.use('/api/v1', (req,res,next) => {
    let data = {
        api : "Welcome"
    }
    next(new BadRequest('Hey not found'))
    // res.json(data)
})  

// 404 error
app.use('/*', (req,res,next)=>{
    res.status(404).json({
        msgt: `Cannot ${req.method} ${req.url} Not found`
    })
})

// error handles
app.use(genericErrorHandler)

module.exports = app;





