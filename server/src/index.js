import express from 'express';
import mongoose from 'mongoose'




try{
    const uri = 'mongodb://localhost:27017/cameras';
    await mongoose.connect(uri);
    console.log('Successfuly connected to DB!')
}catch(err){
    console.log('Connection to DB failed!');
    console.log(err.message);
}


// setup CORS

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', "*");
})



const app = express();


app.get('/', (req,res)=>{
    res.json({message:'It works!'})
});


app.get('/data/catalog', (req,req)=>{
    res.jason({message: 'THIS IS THE CATALOG'})
})


app.listen(3030,()=>console.log('restful server running on http://localhost:3030...'))