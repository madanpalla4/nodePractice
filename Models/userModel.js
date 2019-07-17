const mongoose=require('mongoose');
const crypto=require('crypto')

const userschema=mongoose.Schema({
    Name:String,
    Email:String,
    password:String
   
},{timestamps:true})




module.exports=mongoose.model('Users',userschema);