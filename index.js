const express=require('express')
const parser=require('body-parser')
const bearerToken = require('express-bearer-token');



const app=new express();
app.use(parser.urlencoded({extended:true}))
app.use(parser.json())
app.use(bearerToken());


const mongoose=require('mongoose')
const dbconfig=require('./config/config.js');

mongoose.Promise=global.Promise
debugger
mongoose.connect(dbconfig.url,{ useNewUrlParser: true}).then(()=>
{

    console.log('connected')
}).catch(err=>{
    console.log('something happened');
    process.exit();
})

require('./Routes/defaultRoutes.js')(app);
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'),()=>{
    console.log('started sertver');
})



