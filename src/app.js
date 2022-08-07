require('dotenv').config();
const fs = require('fs'),
  path = require('path')
  cors = require('cors'),
  express = require('express'),
  morgan = require('morgan')

const swaggerUI = require('swagger-ui-express'),
  swaggerDocument = require('./api-docs/index')
  // swaggerDocument = require('./api-docs/swagger.json')

const indexRouter = require('./modules/indexRouter'),
  healthcheckRouter = require('./modules/healthcheck')

const databaseHelper = require('./helpers/dbHelper');
const genericErrorHandler = require('./middlewere/genericErrorHandler');

const app = express();

databaseHelper.init(app)

app.options('*',cors());
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended : false
}))


// api docs
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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

app.use(morgan('dev'));

//dir for template images
app.use( express.static("public"))

app.use('/api/v1',indexRouter)  

app.use('/healthcheck', healthcheckRouter )

// page not found 
app.use('/*', (req,res,next)=>{
    res.status(404).json({
        message: `Cannot ${req.method}. ${req.originalUrl} Not found`
    })
})

// error handles
app.use(genericErrorHandler)



module.exports = app;





