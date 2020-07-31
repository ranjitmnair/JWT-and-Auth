const express=require('express');
const mongoose=require('mongoose');
const app=express();
const dotenv=require('dotenv')

dotenv.config();

//connecting to db

mongoose.connect('mongodb://localhost/31July',{useUnifiedTopology:true,useNewUrlParser:true},()=>{
    console.log("database connected");
})


app.use(express.json());

//importing routes

const authRoute=require('./routes/auth');
const postsRoute=require('./routes/posts');


//route middlewares
app.use('/api/user',authRoute);
app.use('/api/posts',postsRoute);




app.listen(3000,()=>console.log('Server Running'));