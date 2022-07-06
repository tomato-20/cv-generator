const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.options('*',cors());
app.use(cors())

// parse req body 
app.use(express.json());
app.use(express.urlencoded({
  extended : false
}))

// logging request
app.use((req,res,next)=>{
  let date = new Date()
  console.log(`${req.method} ${req.url} : ${date}`)
  next();
})

app.use('/api/v1', (req,res,next) => {
    let data = {
        api : "Welcome"
    }
    res.json(data)
})  

// 404 error
app.use('/*', (req,res,next)=>{
    res.status(404).json({
        msg: `Cannot ${req.method} ${req.url} Not found`
    })
})

// error handles
app.use((err,req,res, next) => {
  if(!err.status) console.error(err.stack|| err)
  res.status(err.status || 500).json({
    message: err.message || err.msg || 'Internal Server Error'
  })
})

module.exports = app;





