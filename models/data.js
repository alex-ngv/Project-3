var mongoose = require('mongoose');

var DataSchema = new mongoose.Schema({
  name: String,
  data: Object
})

var Data = mongoose.model('Data', DataSchema);
module.exports = Data;
