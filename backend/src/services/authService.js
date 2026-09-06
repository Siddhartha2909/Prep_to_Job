const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const{createToken}=require("../utils/generateToken");

const registerUser=async({ name, email, password })=>{
  const userExists=await User.findOne({email:email});
  if(userExists){
    throw new Error("User already exists");
  }

  //hash pasword and create user
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name:name,
    email:email,
    password:hashPassword,
  });
  await newUser.save();

  return{
    id:newUser._id,
    name:newUser.name,
    email:newUser.email,
    role:newUser.role,
  };
};

const loginUser=async ({email,password}) => {
    const user= await User.findOne({email:email});
    if(!user){
        throw new Error("User does not exists");
    }
    const passwordMatch= await bcrypt.compare(password,user.password);
    if(!passwordMatch){
        throw new Error("Email or password mismatch");
    }

    //create jwt
    const token = createToken(user._id);
    return{id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        token
    }

}

module.exports = {registerUser,loginUser};