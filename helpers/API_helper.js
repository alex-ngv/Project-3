var request = require('request');

module.exports = {
  farmMarkets: function (data) {
    request("https://data.cityofnewyork.us/resource/b7kx-qikm.json", function(error, response, body) {
      if(error) {
        console.error(error)
      }
      data(body);
    });
  },
  publicToilets: function (data) {
    request("https://data.cityofnewyork.us/resource/hjae-yuav.json", function(error,response,body){
      if(error){
        console.log(error)
      }
      data(body)
    })
  },
  payphoneComplaints: function (data) {
    request("https://data.cityofnewyork.us/api/views/iipe-cqx6/rows.json?accessType=DOWNLOAD", function(error,response,body){
      if(error){
        console.log(error)
      }
      data(body)
    })
  },
  waterComplaints: function (data) {
    request("https://data.cityofnewyork.us/api/views/qfe3-6dkn/rows.json?accessType=DOWNLOAD", function(error,response,body){
      if(error){
        console.log(error)
      }
      data(body)
    })
  },
  emergencyResponse: function (data) {
    request("https://data.cityofnewyork.us/api/views/pasr-j7fb/rows.json?accessType=DOWNLOAD", function(error,response,body){
      if(error){
        console.log(error)
      }
      data(body)
    })
  }

}
