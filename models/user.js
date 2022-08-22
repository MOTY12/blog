const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    this.password = bcrypt.hashSync(
      this.password,
      Number(process.env.BCRYPT_SALT)
    );
  
    next();
  });

  //hide password hash from response
  userSchema.set("toJSON", {
    transform: function (doc, ret, opt) {
      delete ret["password"];
      return ret;
    },
  });
  
  userSchema.methods.comparePassword = function (plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
  };


module.exports =  userSchema;
