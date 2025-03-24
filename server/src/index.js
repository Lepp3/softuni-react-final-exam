import express from 'express';


const app = express();


app.get('/', (req,res)=>{
    res.send('it works')
});


app.listen(3030,()=>console.log('restful server running on http://localhost:3030...'))