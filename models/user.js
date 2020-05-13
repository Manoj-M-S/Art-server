var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1"); // what is this virtual and why is it used.

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    encrypt_password: {
      type: String,
      required: true
    },
    userinfo: {
      type: String,
      trim: true
    },
    salt: String, // why salt cryptography
    role: {
      type: Number,
      default: 0
    },
    purchases: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

// what is this virtual thing and _password
userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.encrypt_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

//what are this methods
userSchema.methods = {
  authenticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encrypt_password;
  },
  securePassword: function(plainpassword) {
    if (!plainpassword) return ""; // why are you returning  a empty string.
    try {
      return crypto
        .createHmac("sha256", this.salt) // what is sha256 is it general or universal ? and why
        .update(plainpassword)
        .digest("hex"); // same with hex why is it used.
    } catch (error) {
      return "";
    }
  }
};

module.exports = mongoose.model("User", userSchema);
