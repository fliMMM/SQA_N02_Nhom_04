const express = require("express");
const Router = express.Router();
const BillSchema = require("../model/bill");

Router.post("/get-unpaid", async (req, res) => {
  const { userCode } = req.body;
  console.log(userCode);
  try {
    const bills = await BillSchema.find({ userCode, isPaid: false });
    return res
      .status(200)
      .json({ success: true, message: "Lấy bill thành công", data: bills });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "Lấy bill không thành công!" });
  }
});

Router.post("/get-paid", async (req, res) => {
  const { userCode } = req.body;
  console.log(userCode);
  try {
    const bills = await BillSchema.find({ userCode, isPaid: true });
    return res
      .status(200)
      .json({ success: true, message: "Lấy bill thành công", data: bills });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "Lấy bill không thành công!" });
  }
});

Router.post("/pay", async (req, res) => {
  const { userCode, billIds } = req.body;
  // console.log(billIds);
  try {
    const bills = await BillSchema.updateMany(
      { _id: { $in: billIds } },
      { isPaid: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Thanh toan thành công", data: bills });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "Thanh toan không thành công!" });
  }
});
module.exports = Router;
