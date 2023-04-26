const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
  workName: { type: String, default: "", require: true },
  workAddress: { type: String, default: "", require: true },
  deadline: { type: String, require: true },
  salary: { type: String, require: true },
  hinhThucLamViec: { type: String, require: true },
  sex: { type: String, require: true },
  amount: { type: Number, require: true },
  level: { type: String, require: true },
  exp: { type: String, require: true },
  detailInfo: { type: String, require: true },
  creatorId: { type: String, require: true },
  isConfirm: { type: Boolean, default: false },
  Cv: { type: Array, default: [] },
  companyName: { type: String, require: true },
});

module.exports = mongoose.model("post", PostsSchema);
