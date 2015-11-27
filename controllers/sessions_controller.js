var mongoose = require('mongoose'),
    User = require('../models/user.js');

module.exports.controller = function(app) {

  app.post('/sessions', function(req, res) {
    User.find({
      name: req.body.name
    }).exec(function(err, user) {
      console.log(user[0])
      if (user[0]===undefined){
      res.send({msg:'Incorrect username.'})
      console.log(req.session)}
      else{
      user[0].comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch) {
          console.log("Successfully logged in");
          console.log(user[0]._id)
          req.session.currentUser = user[0]._id;
          res.send(user);
          console.log(req.session)
        } else {
          res.send('Incorrect password.');
          }
        });
      }
    });
  });

  app.delete('/sessions', function(req, res) {
    req.session.currentUser = null;
    res.send(console.log('logged out'));
  });

};
