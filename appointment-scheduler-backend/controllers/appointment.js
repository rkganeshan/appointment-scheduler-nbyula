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
        let reqBodyTimeObj=req.body.time;
        req.body.time=new Date(req.body.time);
        console.log("req.body.time::",req.body.time);
        // 2022-10-25T12:00:00.000Z
        const dupApp=await Appointment.find({time:req.body.time});
        console.log("dupApp:",dupApp);
        if(dupApp.length!=0)
        {
            dupApp.forEach((eachDup)=>
            {
                console.log("inside dup if block");
                console.log("dupApp.guest._id::",eachDup.guest._id);
                console.log("dupApp.host._id::",eachDup.host._id);
                console.log("req.user._id::",req.user._id);
                console.log("req.params.userId::",req.params.userId);
                if(eachDup.guest._id==req.user._id || eachDup.guest._id==req.params.userId || 
                    eachDup.host._id==req.user._id || eachDup.host._id==req.params.userId
                    )
                {
                    console.log("condition for slot unavailability matched.")
                    throw ("Meeting Slot Unavailable.")
                }
            })
        }
        if(guest.offs)// 2022-10-25T12:00:00.000Z
        {
            //mm-dd-yyyy
            // let reqBodyTimeObj=""+req.body.time;
            console.log("within guest.offs")
            let tempArrDate=(reqBodyTimeObj.split('T')[0]).split('-');
            console.log("tempArrDate::",tempArrDate);
            let dateAsPerOff=tempArrDate[1]+"-"+tempArrDate[2]+"-"+tempArrDate[0];
            console.log("dateAsPerOff::",dateAsPerOff)
            dateAsPerOff=dateAsPerOff.trim();
            console.log("after trim dateAsPerOff::",dateAsPerOff)
            if(guest.offs[dateAsPerOff])
            {
                console.log("inside guest.offs.dateAsPerOff")
                guest.offs[dateAsPerOff].forEach((item)=>{
                    console.log("item::",item);
                    if(parseInt(reqBodyTimeObj.split('T')[1].split(":")[0])==parseInt(item.split('-')[0]))
                    {
                        console.log("ready to throw from guest...");
                        throw (`Meeting Slot Unavailable, ${guest.name} is not available for the provided time slot.`)
                    }
                })
            }
        }
        if(host.offs)// 2022-10-25T12:00:00.000Z
        {
            //mm-dd-yyyy
            // let reqBodyTimeObj=""+req.body.time;
            console.log("within host.offs")
            let tempArrDate=(reqBodyTimeObj.split('T')[0]).split('-');
            console.log("tempArrDate::",tempArrDate);
            let dateAsPerOff=tempArrDate[1]+"-"+tempArrDate[2]+"-"+tempArrDate[0];
            console.log("dateAsPerOff::",dateAsPerOff)
            dateAsPerOff=dateAsPerOff.trim();
            console.log("after trim dateAsPerOff::",dateAsPerOff)
            if(host.offs[dateAsPerOff])
            {
                console.log("inside host.offs.dateAsPerOff")
                host.offs[dateAsPerOff].forEach((item)=>{
                    console.log("item::",item);
                    if(parseInt(reqBodyTimeObj.split('T')[1].split(":")[0])==parseInt(item.split('-')[0]))
                    {
                        console.log("ready to throw from host...");
                        throw (`Meeting Slot Unavailable as you have marked this slot as an off hour for yourself.`)
                    }
                })
            }
        }
        const newAppointment=await Appointment.create({...req.body,host,guest});
        console.log("newAppointment:",newAppointment);
        return res.status(200).send({newAppointment:newAppointment})
    }
    catch(err)
    {
        return res.status(500).send({message:err});
    }
}
