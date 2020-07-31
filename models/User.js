const mongoose=require('mongoose');
const Joi=require('joi');
const userSchema=mongoose.Schema({
    name:{
         type:String,
         required:true,
         min:6
    },
    email:{
         type:String,
         required:true,
         min:6
    },
    password:{
         type:String,
         required:true,
         min:6
    }
},{
     timestamps:true
});

module.exports=mongoose.model('User',userSchema);