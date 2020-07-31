const express=require('express');
const mongoose=require('mongoose');
const app=express();

//connecting to db

mongoose.connect('mongodb://localhost/31July',{useUnifiedTopology:true,useNewUrlParser:true},()=>{
    console.log("database connected");
})


app.use(express.json());

//importing routes

const authRoute=require('./routes/auth');


//route middlewares
app.use('/api/user',authRoute);




app.listen(3000,()=>console.log('Server Running'));