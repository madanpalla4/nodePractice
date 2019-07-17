const mongoose=require('mongoose');

const userDetailsSchema=mongoose.Schema({
    FullName:String,
    DOB:Date,
    Email:String,
    Country:String,
    State:String,
    Phone:String,
    Userid:String
},{timestamps:true})

module.exports=mongoose.model("UserDetails",userDetailsSchema)