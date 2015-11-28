var mongoose = require('mongoose'),
    api = require('../helpers/API_helper.js');

module.exports.controller = function(app) {

  var authenticate = function (req, res, next) {
    console.log(req.session)
    req.session.currentUser ? next() : res.status(403).send({err: 403, msg: "log in troll"});
  };

  app.get('/farm/', (req,res)=> {
    api.farmMarkets (function(data){
      res.send(data)
    });
  });
  app.get('/toilet/',authenticate,(req,res)=>{
    api.publicToilets (function(data){
      res.send(data)
    })
  });
  app.get('/payphone/',authenticate,(req,res)=>{
    api.payphoneComplaints (function(data){
      res.send(data)
    })
  });
  app.get('/watercomplaints/',authenticate,(req,res)=>{
    api.waterComplaints (function(data){
      res.send(data)
    })
  });
  app.get('/emergencyresponse/',authenticate,(req,res)=>{
    api.emergencyResponse (function(data){
      res.send(data)
    })
  });
};
