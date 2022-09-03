const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cookieParser=require("cookie-parser")
const fs=require("fs");
const cors=require("cors");
// passport req-starts
const configurePassport = require("./config/passport");
const passport = require("passport");
configurePassport(passport);
// passport req-ends


const app=express();
dotenv.config();
const authRoutes=require("./routes/auth");
const userRoutes=require("./routes/user");
const appointmentRoutes=require("./routes/appointment");
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
//route middlewares
app.use("/auth",authRoutes);
app.use("/user",userRoutes);
app.use("/appointment",appointmentRoutes);
//api documentation
// app.get("/",(req,res)=>{
//     fs.readFile("docs/apiDocs.json",(err,data)=>{
//         if(err)
//         {
//             res.status(400).json({error:err})
//         }
//         const docs=JSON.parse(data);
//         res.status(200).json(docs)
//     })
// })
//connecting to DB
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to DB!");
})
.catch((err)=>{console.log(err)});


//make the app listen
app.listen(process.env.PORT || 8082,{
            useUnifiedTopology:true,
            useNewUrlParser: true,
            useCreateIndex: true
},()=>{
    console.log(`App is listening at Port:${process.env.PORT}`);
})