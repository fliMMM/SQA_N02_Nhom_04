const express = require("express");
const Router = express.Router();
const BillSchema = require("../model/bill");
const nodemailer = require("nodemailer");
const UserSchema = require('../model/user')

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

const genMailcontent = (bills) => {
  let html = "";

  bills.map((bill) => {
    html+= `<h1>${bill.content}: <span>${bill.electricityIndex * 2500}</span></h1>`
  })
  return html;
}

const sendEmail = (receiverEmail, bills) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    secure:true,
    auth: {
      user: "bachkame123@gmail.com",
      pass: "yylywaybxwiqyvjk",
    },
  });

  var mailOptions = {
    from: "bachkame123@gmail.com",
    to: receiverEmail,
    subject: "Hóa đơn tiền điện đã được thanh toán",
    html: genMailcontent(bills)
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + receiverEmail);
    }
  });
};

Router.post("/pay", async (req, res) => {
  const { userCode, billIds } = req.body;
  // console.log(billIds);
  try {
    const user = await UserSchema.find({ userCode: userCode })
    const bills = await BillSchema.find({_id:{$in:billIds}})
    await BillSchema.updateMany(
      { _id: { $in: billIds } },
      { isPaid: true }
    );
    sendEmail(user[0].email, bills)
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
