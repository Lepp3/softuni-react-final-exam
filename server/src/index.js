import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes.js';

// initialize app
const app = express();

//connect DB
try{
    const uri = 'mongodb://localhost:27017/camera-shop';
    await mongoose.connect(uri);
    console.log('Successfuly connected to DB!')
}catch(err){
    console.log('Connection to DB failed!');
    console.log(err.message);
}



app.use(express.json());
// setup CORS
app.use(cors());
app.use(routes)
app.use((err, req, res, next) => {
    // console.error("Error:", err.message);

    if (!res.headersSent) {
        res.status(res.statusCode >= 400 ? res.statusCode : 500).json({ error: err.message });
    }
});






app.listen(3030,()=>console.log('restful server running on http://localhost:3030...'))