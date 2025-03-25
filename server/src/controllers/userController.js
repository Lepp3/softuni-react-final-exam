import {Router} from 'express';
import userService from '../services/userService.js';
import User from '../models/User.js';


const userController = Router();


userController.post('/register', async (req,res)=>{

    const user = await User.findOne({email: userData.email});

    if(user){
        throw new Error('Email already in use!');
    };


    if(userData.password !== userData.rePassword){
        throw new Error('Passwords missmatch!');
    }

    const userData = req.body;
   
    const createdUser = await userService.register(userData);

    res.json({createdUser});
})



export default userController;