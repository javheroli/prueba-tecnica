const express = require('express');
const app = express();
var bodyParser = require("body-parser");
var secureRoutes = require("./routes/secureRoutes.js");
var routes = require("./routes/routes.js");
const mongoose = require('mongoose')
const UserModel = require('./models/userModel');
const passport = require('passport');
require('dotenv').config();
var port = process.env.PORT || 3000;


//Handle errors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS, PUT, DELETE");
   //intercepts OPTIONS method
   if ('OPTIONS' === req.method) {
    //respond with 200
    res.send(200);
  }
  else {
  //move on
    next();
  }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes(app);
//To connect in local
//mongoose.connect('mongodb://localhost:27017/prueba-tecnica', { useNewUrlParser: true });

//To connect in Heroku
mongoose.connect('process.env.MONGO_URI', { useNewUrlParser: true });

mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./auth/auth');

app.use('/api/user', routes);
app.use('/api/companies', passport.authenticate('jwt', { session : false }), secureRoutes );


app.use(express.static('public'));


var server = app.listen(port, function () {
  console.log("The API is running on port:", server.address().port);
});