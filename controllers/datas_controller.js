var mongoose = require('mongoose'),
  Data = require('../models/data.js');

module.exports.controller = function(app) {

  app.get('/data/:question',function(req,res){
    // res.send(console.log(req.params.question))
    Data.find({name:req.params.question}).exec(function(err,data){
<<<<<<< HEAD
      console.log(data)
=======
>>>>>>> aca81730e991b5f430758a561c37fe38f50811a6
      res.send(data)
    })
  });

  app.post('/data', function(req,res){
      var data = new Data(req.body);
      data.save(function(err) {
            if (err) {
              console.log(err)
            } else {
              res.send(data)
            }
          })
        });

}
