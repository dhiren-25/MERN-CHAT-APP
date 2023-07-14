const { default: SetAvatar } = require("../../public/src/pages/setAvatar");
const { register,login } = require("../controllers/usersController");

 const router =require("express").Router();

 router.post("/register",register);
 router.post("/login",login);
 router.post("/setAvatar/:id",SetAvatar);
 module.exports = router;