const jwt=require('jsonwebtoken');
const config=require('../config/config.js')



exports.verifyJwt=(req,res)=>{
    jwt.verify(Token,config.secrete,(err,res)=>{
        if(err)
        {
          return  false
           
        }
        else
        {
          return  true
          
        }
    })
};