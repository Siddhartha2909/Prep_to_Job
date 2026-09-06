const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema=new Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
  },
  password:{
    type: String,
    required: true,
  },
  role:{
    type:String,
    required:true,
    enum:["user", "admin"],
    default:"user",
  }
});
const User = mongoose.model("User", userSchema);
module.exports = User;