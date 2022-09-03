const express=require("express");
const router=express.Router();
const {showAllAppointmentsForCurrentUser,createAppointment} =require("../controllers/appointment");
const {userById} =require("../controllers/user");
const passport = require("passport");
const authenticate = passport.authenticate("jwt", { session: false });
const {appointmentValidator}=require("../validators/index");

router.get("/",authenticate,showAllAppointmentsForCurrentUser);
router.post("/:userId",authenticate,appointmentValidator,createAppointment);
// router.get("/:userId",authenticate,getUser);
// router.put("/:userId",authenticate,updateUser);
// router.delete("/:userId",authenticate,deleteUser);

router.param("userId",userById);

module.exports=router;