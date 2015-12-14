var express = require('express'),
    logger = require('morgan'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    app = express(),
    api = require('./helpers/API_helper.js');

//Set up app to use middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(session({
  secret: 'alex',
  saveUninitialized: false,
  resave: false
}));

//AUTHENCTICATON

var authenticate = function (req, res, next) {
  console.log(req.session)
  req.session.currentUser ? next() : res.status(403).send({err: 403, msg: "log in troll"});
};

//Connect to mongodb
mongoose.connect('mongodb://localhost/p3_t1_App', function (err) {
  if(err){
    console.log(err);
  }else {
    console.log('connection successful');
  }
});

//Set up the port to listen
app.listen(3000, function () {
  console.log('App listening on port 3000...');
});

//building some routes

//Controllers
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});
