const User=require("../models/user");
const Appointment=require("../models/appointment");

exports.showAllAppointmentsForCurrentUser=async(req,res)=>{
    try{
        const appointments=await Appointment.find({$or:[{host: req.user._id},{guest:req.user._id}]}).populate("host","_id name").populate("guest","_id name");
        return res.status(200).send({appointments});
    }
    catch(err)
    {
        return res.status(500).send({message:err});
    }
}

exports.createAppointment=async(req,res)=>{
    try{
        let host=req.user;
        let myGuest=await User.findById(req.params.userId);
        let guest=myGuest;
        req.body.time=new Date(req.body.time);
        console.log("req.body.time::",req.body.time);
        const dupApp=await Appointment.find({time:req.body.time});
        if(dupApp)
        {
            throw ("Meeting Slot Unavailable.")
        }
        const newAppointment=await Appointment.create({...req.body,host,guest});
        return res.status(200).send({newAppointment:newAppointment})
    }
    catch(err)
    {
        return res.status(500).send({message:err});
    }
}
