const mongoose=require('mongoose');
const postsSchema=mongoose.Schema({
    // user_id:{
    //     type:String,
    //     required:true
    // },
    title:{
         type:String,
         required:true,
         min:5
    },
    description:{
         type:String,
         required:true,
         min:20
    },
    date:{
        type:Date,
        default:Date.now()
    }
},{
     timestamps:true
});

module.exports=mongoose.model('Post',postsSchema);