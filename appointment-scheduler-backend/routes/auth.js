const express=require("express");
const router=express.Router();
const {signup,signin,signout}=require("../controllers/auth");
const {userById} =require("../controllers/user");
const {userSignupValidator}=require("../validators/index");

const passport = require("passport");
const authenticate = passport.authenticate("jwt", { session: false });

router.post("/signup",userSignupValidator,signup);
router.post("/signin",signin);
router.get("/signout",signout);

router.param("userId",userById);

module.exports=router;