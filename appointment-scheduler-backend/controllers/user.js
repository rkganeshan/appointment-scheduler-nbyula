const User=require("../models/user");
const _=require("lodash");
const e = require("express");
exports.userById=async(req,res,next)=>{
    const user=await User.findById(req.params.userId)
    .then((resp)=>{
        console.log("user contr 6::resp, req.profile::",resp);
        req.profile=resp;
        console.log("req.profile:",req.profile);
    })
    .catch((err)=>console.log(err));
    next();
}

exports.showAllUsers=async(req,res)=>{
    const users=await User.find({}).select("name email created")
    .then((resp)=>{
        res.status(200).json({
            users:resp
        })
    })
    .catch((err)=>{
        res.status(500).json({
            err
        })
    })
}
exports.getUser=(req,res)=>{
    console.log("getUser---");
    console.log("req.profile:",req.profile);    
    console.log("req.user:",req.user);    
    // console.log("req.profile:",req.profile);    
    console.log("getUser---");
    //commented below
    // if(req.profile && req.user && req.user._id.equals(req.profile._id))
    // {
    //     req.profile.hashed_password=undefined;
    //     return res.status(200).json({user:req.profile});
    // }
    // else{
    //     return res.status(401).json({message:"You are not authorized to get/fetch this user."})
    // }
    //added below
    req.profile.hashed_password=undefined;
    return res.status(200).json({user:req.profile});
}

exports.updateUser=async(req,res,next)=>{
    if(req.profile && req.user && req.user._id.equals(req.profile._id))
    {
        let user=req.profile;
        
        if(req.body.offDate && req.body.offSlot)
        {
            const currUser=await User.findById(req.params.userId);
            let offs={};
            if(currUser.offs)
            {
                offs=currUser.offs;
                if(offs[req.body.offDate])
                {
                    offs[req.body.offDate]=[...offs[req.body.offDate],(req.body.offSlot)];
                    req.body.offDate="";
                    req.body.offSlot="";
                    req.body.offs=offs;
                }
                else
                {
                    offs[req.body.offDate]=[req.body.offSlot];
                    req.body.offDate="";
                    req.body.offSlot="";
                    req.body.offs=offs;
                }
            }
            else
            {
                offs[req.body.offDate]=[req.body.offSlot];
                req.body.offDate="";
                req.body.offSlot="";
                req.body.offs=offs;
            }
        }
        console.log("59..::",req.body);
        user=_.extend(user,req.body);
        user.updated=Date.now();
        await user.save((err,user)=>{
            if(err)
            {
                return res.status(400).json({
                    error:"You aren't authorized to perform this action."
                })
            }
            user.hashed_password=undefined;
            res.json({user});
            console.log("user update result:",user);
        })
    }
    else{
        return res.status(401).json({message:"You are not authorized to update this user."})
    }
}

exports.deleteUser=async(req,res,next)=>{
    if(req.profile && req.user && req.user._id.equals(req.profile._id))
    {
        console.log("from deleteUser req.profile:",req.profile);
        const user=req.profile;
        const delUser=await User.deleteOne({_id:req.profile._id})
        .then((resp)=>{
            res.status(200).json({
                message:"User successfully deleted.",
                deletedUser:resp
            })
        })
        .catch((err)=>{
            res.status(500).json({
                err
            })
        })
    }
    else{
        return res.status(401).json({message:"You are not authorized to delete this user."})
    }
    
}