const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

const appointmentSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    agenda:{
        type:String,
        required:true,
        trim:true
    },
    time:{
        type:Date,
        required:true
    },
    guest:{
        type:ObjectId,
        ref:"User"
    },
    host:{
        type:ObjectId,
        ref:"User"
    },
    created:{
        type:Date,
        default:Date.now
    },
    updated:Date
})

module.exports=mongoose.model("Appointment",appointmentSchema);