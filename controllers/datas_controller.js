var mongoose = require('mongoose'),
  Data = require('../models/data.js');

module.exports.controller = function(app) {

  app.get('/data/:question',function(req,res){
    // res.send(console.log(req.params.question))
    Data.find({name:req.params.question}).exec(function(err,data){
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
