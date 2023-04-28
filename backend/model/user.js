const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {type: String, require: true},
  password: { type: String, require: true },
  electricityIndex: { type: Number, default:150 },
  userCode: { type: String, require: true },
  address: { type: String, require: true },
  fullname: {type:String, required:true}
}, {timestamps:true})


module.exports = mongoose.model('User', UserSchema)