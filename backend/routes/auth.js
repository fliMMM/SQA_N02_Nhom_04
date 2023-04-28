const express = require("express");
const Router = express.Router();
const UserSchema = require("../model/user");
const BillsSchema = require("../model/bill");
var cron = require("node-cron");

Router.post("/login", async (req, res) => {
  const data = req.body;
  console.log("a user login: ", data);

  try {
    const user = await UserSchema.findOne(data);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Sai tên đăng nhập hoặc mật khẩu" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Đăng nhập thành công", user: user });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "Đăng nhập không thành công!" });
  }
});

const scheduleAddBill = async (user) => {
  console.log("start schedule for: ", user.fullname);
  const _newBill = new BillsSchema({
    userCode: user.userCode,
    electricityIndex: 150,
    content: `Tiền điện tháng ${new Date().getMonth() +1}`,
  });
  await _newBill.save();
  cron.schedule("0 1 28 * *", async () => {
    const newBill = new BillsSchema({
      userCode: user.userCode,
      electricityIndex: 150,
      content: `Tiền điện tháng ${new Date().getMonth() +1}`,
    });
    console.log("add bill for user: ", user.email);
    await newBill.save();
  });
};

Router.post("/register", async (req, res) => {
  const data = req.body;
  console.log("a user register: ", data);
  if (data.password !== data.confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Mật khẩu và mật khẩu xác nhận không khớp",
    });
  }
  try {
    const user = await UserSchema.findOne({ email: data.email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email đã được đăng kí" });
    }

    const userWithExistUserCode = await UserSchema.findOne({
      userCode: data.userCode,
    });

    if (userWithExistUserCode) {
      return res
        .status(400)
        .json({ success: false, message: "Mã khách hàng đã được đăng kí" });
    }

    scheduleAddBill(data);

    const { confirmPassword, ..._data } = data;
    const newUser = new UserSchema(_data);
    await newUser.save();

    return res
      .status(200)
      .json({ success: true, message: "Đăng kí thành công", user: newUser });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "Đăng nhập không thành công!" });
  }
});

module.exports = Router;
