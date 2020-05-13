const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, // what is trim and why do we use it
      required: true,
      maxlength: 32,
      unique: true
    }
  },
  {
    timestamps: true
  }
); //read about time stamps updated etc

module.exports = mongoose.model("Category", categorySchema);
