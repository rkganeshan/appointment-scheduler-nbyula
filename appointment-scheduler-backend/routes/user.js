const express=require("express");
const router=express.Router();
const {userById,showAllUsers,getUser,updateUser,deleteUser} =require("../controllers/user");

const passport = require("passport");
const authenticate = passport.authenticate("jwt", { session: false });

router.get("/",showAllUsers);
router.get("/:userId",getUser);
router.put("/:userId",authenticate,updateUser);
router.delete("/:userId",authenticate,deleteUser);

router.param("userId",userById);

module.exports=router;