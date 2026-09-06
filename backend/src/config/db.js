const mongoose = require("mongoose");

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB Server");
    }
  catch(error){
    console.error("MongoDB connection error:", error);
  };
}

module.exports = connectDb;