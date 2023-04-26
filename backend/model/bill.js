const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillsSchema = new Schema({
  userCode: { type: String, require: true },
  amountMoney: { type: Number, require: true },
  electricityIndex:{type:Number, require:true}
},{timestamps:true});

module.exports = mongoose.model("post", BillsSchema);
