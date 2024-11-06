import initApiRouter from "./routes/api.js";
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require("./config/connectDB")
var cors = require('cors')
var bodyParser = require('body-parser')
require('dotenv').config();
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// connect database
connectDB();
// cors
app.use(cors());

initApiRouter(app);

app.listen(8000, () => {
    console.log("is running on the the port", 8000);
  });
  