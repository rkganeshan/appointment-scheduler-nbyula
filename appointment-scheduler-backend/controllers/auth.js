const User=require("../models/user");
const bcrypt=require("bcrypt");
const dotenv=require("dotenv");
const jwt=require("jsonwebtoken");
dotenv.config();
exports.signup=async(req,res)=>{
    const userExists=await User.findOne({email:req.body.email});
    if(userExists)
    {
        
        return res.status(403).json({message:"User with same email already exists, try logging in!"});
    }
    const hashed_password=await User.encryptPassword(req.body.password);
    const newUser=await User.create({...req.body,hashed_password:hashed_password})
    .then((resp)=>{
        resp.hashed_password=undefined;
        res.status(200).json({newUser:resp,message:"New user created successfully!"})
    })
    .catch((err)=>{
        res.status(500).json({message:err})
    })
}

exports.signin=async(req,res)=>{
    const userExists=await User.findOne({email:req.body.email});
    if(!userExists)
    {
        return res.status(403).json({message:"User with this email does not exists,kindly SignUp!"});
    }
    // const hashed_password=await User.encryptPassword(req.body.password);
    console.log("user:",userExists);
    // console.log("hp:",hashed_password);
    if(!bcrypt.compareSync(req.body.password, userExists.hashed_password))
    {
        return res.status(401).json({message:"Authentication unsuccessful!"})
    }
    //generate token with user id and .env secret
    const token=jwt.sign({_id:userExists._id},process.env.SECRET,{expiresIn:"3600000"});
    // let d=moment.u
    console.log("token:",token);
    // console.log("dec:",jwt.decode(token).exp);
    // let date = new Date(jwt.decode(token).exp * 1000);
    // let dd=date.getDate();
    // let mm=date.getMonth();
    // let yyyy=date.getFullYear();
    // console.log("dd:",dd+"");
    // console.log("mm:",mm);
    // console.log("yyyy:",yyyy+"");
    // console.log("date:",date.toISOString());
    
    // jwt.decode(token).exp
    // console.log(d);

    //persist the response as t in cookie and provide expiry date
    userExists.hashed_password=undefined;
    res.cookie("t",token);

    res.status(200).json({message:"Logged in.",token,user:userExists})
}

exports.signout=(req,res)=>{
    res.clearCookie("t");
    res.status(200).json({message:"Signout Successful!"});
}