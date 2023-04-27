const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
// const postRoute = require("./routes/post");
const emailRoute = require("./routes/email");
const billRoute = require("./routes/bill");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connect to db success");
  })
  .catch((e) => {
    console.log("connect to db faile");
  });

app.use("/api/v1/auth", authRoute);
// app.use("/api/v1/post", postRoute);
app.use("/api/v1/email", emailRoute);
app.use("/api/v1/bill", billRoute);

app.listen(process.env.PORT || 5555, () => {
  console.log("server is running at ", process.env.PORT || 5555);
});
