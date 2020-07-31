const router =require('express').Router();
const verify=require('./verifyToken');
const Post=require('../models/Posts');
const {postValidation}=require('../validation');

router.get('/',verify,(req,res)=>{
    res.send(req.user);
})

router.post('/',verify,async(req,res)=>{
    const {error}=postValidation(req.body);
    if(error)return res.status(400).send(error.details[0].message);

    // Post.create(req.body);
    
    const post=new Post({
        id:req.user.id,
        title:req.body.title,
        description:req.body.description
    });
    try {
        const savedPost=await post.save();
        res.status(200).send('posted successfully');
    } catch (error) {
        res.status(400).send(error);        
    }
})

module.exports=router;