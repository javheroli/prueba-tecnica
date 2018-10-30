const express = require('express');
const app = express();
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
const port = 3000;
const mongoose = require('mongoose')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes(app);

const db = mongoose.connect('mongodb://localhost:27017/prueba-tecnica', { useNewUrlParser: true });

app.use('/api/companies', routes);






var server = app.listen(3000, function () {
  console.log("The API is running on port:", server.address().port);
});














