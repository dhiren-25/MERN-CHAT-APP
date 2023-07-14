 const User = require("../model/userModel");
 const brcypt=require("bcrypt"); //use for password encryption

module.exports.register =async(req,res,next) => {
   try{
    const{username, email,password} = req.body;
   const usernameCheck = await User.findOne({ username });
   if(usernameCheck) 
    return res.json({ msg:"Username already used",status: false});
   
    const emailCheck = await User.findOne({ email });
    if(emailCheck)
        return res.josn({ msg: "Email is already used", status: false});
    const hashedPassword = await brcypt.hash(password,10);
    const user = await User.create({
        email,
        username,
        password:hashedPassword,
    });  
    delete user.password;
    return res.json({status:true,user});
   }catch(ex){
    next(ex);
   }
};


module.exports.login =async(req,res,next) => {
    try{
     const{username,password} = req.body;
    const user = await User.findOne({ username });
   

    if(!user) 
     return res.json({ msg:"Incorrect username and password",status: false});

    const isPasswordValid = await brcypt.compare(password,user.password);
    console.log(isPasswordValid);
    if(!isPasswordValid)
        return res.json({msg:"Incorrect username and password",status:false});     


     delete user.password;
     return res.json({status:true,user});
    }catch(ex){
     next(ex);
    }
 };


// module.exports.login = async (req, res, next) => {
//     try {
//       const { username, password } = req.body;
      
//       // Check if username and password are provided
//       if (!username || !password) {
//         return res.json({ msg: "Username and password are required", status: false });
//       }
  
//       const user = await User.findOne({ username });
//       if (!user) {
//         return res.json({ msg: "Incorrect username and password", status: false });
//       }
  
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return res.json({ msg: "Incorrect username and password", status: false });
//       }
  
//       delete user.password;
//       return res.json({ status: true, user });
//     } catch (ex) {
//       next(ex);
//     }
//   };
  
module.exports.setAvatr = async (req,res,next) => {
try{
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId,{
        isAvatarImageSet:true,
        avatarImage,
    });
    return res.json({
        isSet:userData.isAvatarImageSet,
        image:userData.avatarImage});

}catch(ex){
    next(ex);
}
};