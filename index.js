const express = require('express');
const app = express();
var bodyParser = require("body-parser");
var secureRoutes = require("./routes/secureRoutes.js");
var routes = require("./routes/routes.js");
const mongoose = require('mongoose')
const UserModel = require('./models/userModel');
const passport = require('passport');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes(app);
mongoose.connect('mongodb://localhost:27017/prueba-tecnica', { useNewUrlParser: true });

const db = mongoose.connect('mongodb://localhost:27017/prueba-tecnica', { useNewUrlParser: true });
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./auth/auth');

app.use('/api/user', routes);
app.use('/api/companies', passport.authenticate('jwt', { session : false }), secureRoutes );

//Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});




var server = app.listen(3000, function () {
  console.log("The API is running on port:", server.address().port);
});