var mongoose = require('mongoose'),
  Data = require('../models/data.js');

module.exports.controller = function(app) {

  app.get('/data/:question',function(req,res){

    res.send(console.log(req.params))
    // var data = new Data(req.body);
    // data.save(function(err){
    //   if(err){console.log(err)}
    //   else{res.send(data)}
    // })
  })


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

}
