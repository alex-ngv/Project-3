var mongoose = require('mongoose'),
  User = require('../models/user.js');

module.exports.controller = function(app) {

  app.get('/users', function(req, res) {
    User.find().populate('posts').exec(function(err, users) {
      res.send(users);
    });
  });

  var restrictAccess = function (req, res, next) {
    var sessionId = req.session.currentUser;
    var reqId = req.params.id;
    sessionId = reqId ? next() : res.status(400).send({err: 400, msg: "You shall not pass"});
  };

  var authenticate = function (req, res, next) {
    req.session.currentUser ? next() : res.status(403).send({err: 403, msg: "log in troll"});
  };

  app.get('/users/:id', authenticate, restrictAccess, function (req, res) {
    User.findById(req.params.id).exec(function (err, user) {
      res.send(user);
    });
  });

  app.post('/users', function(req,res){
    var user = new User(req.body);
    User.findOne({
      name: req.body.name
    }).exec(function(err,results){
      if (results !== null){
        res.send({msg:'User already exists.'})
      }else if (req.body.password.length < 6){
         res.send({msg:'Password should be at least 6 characters long.'})}
      else{user.save(function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log("User saved");
                res.send({msg:"User "+user.name+" created."});
              }
            });
          }
      })
  })

  app.put('/users', function (req, res) {
    console.log("put route session id : " + req.session.currentUser);
    User.findById(req.session.currentUser).populate('posts').exec(function (err, user) {
      console.log(user)
      user.addPost(req, res)
    });
  });

};
