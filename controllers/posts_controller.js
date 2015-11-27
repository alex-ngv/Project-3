var mongoose = require('mongoose'),
    Post = require('../models/post.js');
    User = require('../models/user.js');

module.exports.controller = function (app) {

  app.get('/posts', function(req, res) {
    Post.find().exec(function (err, posts) {
      res.send(posts);
    });
  });

  app.post('/posts', function(req,res){
    console.log(req.session)
    User.findById(req.session.currentUser).exec(function(err, user) {
          var post = new Post(req.body);
          post.save(function(err) {
            if (err) {
              console.log(err)
            } else {
              user.posts.push(post._id);
              user.save(function(err) {
                if (err) {
                  console.log(err)
                } else {
                  res.send(user);
                }
              })
            }
          });
        });
      });
    };
