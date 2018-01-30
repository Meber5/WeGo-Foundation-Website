"use strict";
//npm packages -- some of these probably need to be looked into and removed
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

mongoose.connection.on('connected', () => {
  console.log("connected to database.");
});

mongoose.connect("mike:315055@ds117848.mlab.com:17848/form");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'saturdaysarefortheboys', // session secret
    resave: true,
    saveUninitialized: true
}));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("successfully connected to the database.");
});

//user schema
var Schema = mongoose.Schema;

var resultSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  comments: String,
})

var Result = mongoose.model('Result', resultSchema);

app.get("/", (req, res) => {
  console.log("Connected to server.");
  res.json({connected: true});
})

app.post("/", (req, res) => {
  var n = new Result({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    comments: req.body.comments
  })

  n.save((err, n) => {
    if(err) {
      console.log(err);
    } else {
      console.log(n);
    }
  })
})


app.listen(3000);
