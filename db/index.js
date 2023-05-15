const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(process.env.MONGO_URI || "mongodb://localhost:27017/mythicals")
      .then(() => console.log("DB connected"))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};
