var express = require('express');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var dotenv = require('dotenv');
var app = express();
dotenv.load();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

 app.use(session({
    secret: 'this is the secret',
     resave: true,
     saveUninitialized: true
 }));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);
// require("./assignment-wed/app.js")(app);

//var assignment = require("./assignment/app.js");
var project = require("./project/app.js");
//assignment(app);
project(app);

var port      = process.env.PORT || 3000;

app.listen(port);