const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillsSchema = new Schema({
  userCode: { type: String, require: true },
  amountMoney: { type: Number},
  electricityIndex: { type: Number, require: true },
  isPaid: { type: Boolean, default: false },
  content:{type:String}
},{timestamps:true});

module.exports = mongoose.model("bill", BillsSchema);
