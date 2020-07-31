const router =require('express').Router();
const User=require('../models/User');
const {registerValidation,loginValidation}=require('../validation');
const bcrypt=require('bcryptjs');


router.post('/register',async (req,res)=>{
    //validation
    const {error}=registerValidation(req.body);
    if(error)return res.status(400).send(error.details[0].message);


    //check if user already exists
    const emailExist=await User.findOne({email:req.body.email});
    if(emailExist)return res.status(400).send("Email already exists");

    //hashing the password

    const salt=await bcrypt.genSalt(10); 
    const hashPassword= await bcrypt.hash(req.body.password,salt);
    
    //creating new user
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    });
    try {
        const savedUser=await user.save();
        res.send({user:user._id});
    } catch (err) {
        res.status(400).send(err);
    }

});



router.post('/login',async(req,res)=>{
    const {error}=loginValidation(req.body);
    if(error)return res.status(400).send(error.details[0].message);

    const user=await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email wrong');
    // console.log(user);

    //check password is correct
    const validPassword=await bcrypt.compare(req.body.password,user.password);
    if(!validPassword)return res.status(400).send('Password wrong');

    res.send('Logged in');

});






module.exports=router;