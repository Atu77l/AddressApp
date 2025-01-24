// models/User.js
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  uuid:{type:String},
  name: { type:String},
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },

  contact:{type:String,required:true},
  confirmpassword:{type:String,required:true}
});

module.exports = mongoose.model('Form', formSchema);
