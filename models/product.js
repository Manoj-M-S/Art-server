const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema; // what is this object Id and why is it starting with capital letter

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true
    },
    stock: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    //go through it once again what is buffer and contenttype
    photo: {
      data: Buffer,
      contentType: String
    }

    //see how you can add a review section to this.
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);
