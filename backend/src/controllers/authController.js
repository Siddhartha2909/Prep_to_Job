const {registerUser, loginUser} = require("../services/authService");
const register = async(req,res)=>{
    try{
        const{name,email,password} = req.body;
        const user = await registerUser({
            name,email,password
        });
        res.status(201).json({message:"User registered", user});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

const login =async (req,res)=>{
    try{
        console.log("Headers:",req.headers);
        console.log("Body:", req.body);
        const{email, password} = req.body;
        const user = await loginUser({email,password});
        res.status(200).json({message:"User logged in", user});
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports={register, login};