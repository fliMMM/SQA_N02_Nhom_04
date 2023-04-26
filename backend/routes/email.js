const express = require("express");
const Router = express.Router();
const nodemailer = require("nodemailer");

Router.post("/", async (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bachkame@gmail.com",
      pass: "rwrauimztyckxabd",
    },
  });

  var mailOptions = {
    from: "bachkame123@gmail.com",
    to: req.body.receiver,
    subject: "Thông báo Cv của bạn đã được duyệt",
    text: "Cv của bạn đã được duyệt!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(400).json({ success: false, message: error });
    } else {
      console.log("Email sent: " + info.response);
      return res
        .status(200)
        .json({ success: true, message: "Gửi email thành công" });
    }
  });
});

module.exports = Router;
