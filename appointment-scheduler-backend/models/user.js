const mongoose=require("mongoose");
const bcrypt = require('bcrypt');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    offs:{
        type:Object
    },
    hashed_password:{
        type:String,
        required:true,
    },
    salt:String,
    created:{
        type:Date,
        default:Date.now
    },
    updated:Date,
    
})

userSchema.statics.encryptPassword=async function(password){
    if(!password){
        // console.log("password:",password);
        return "";
    }
    try{
        const salt = await bcrypt.genSalt();
        let h=await bcrypt.hashSync(password, salt);
        // console.log("hash:",h);
        return h;
    }
    catch(err){
        return "";
    }
}


module.exports=mongoose.model("User",userSchema);