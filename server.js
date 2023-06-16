const express= require('express');
const mongoose=require("mongoose");
PORT = 2221
const app= express();
const router= require('./router/router')
app.use(express.json())
app.use(router)

mongoose.connect("mongodb+srv://ogahdominic93:EwO6TrSaKFAtZMjK@cluster0.zzawxdc.mongodb.net/")
.then(()=>{
    console.log("database is connected successfully")
}).catch((error)=>{
    console.log(error.message)

})



app.listen(PORT,()=>{
    console.log(`port is listening to ${PORT}`)

})



