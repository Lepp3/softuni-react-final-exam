import {Router} from 'express';
import userService from '../services/userService.js';




const userController = Router();


userController.post('/register', async (req,res)=>{

    const userData = req.body;

    try{
        const createdUser = await userService.register(userData);
        res.status(201).json({createdUser});
    }catch(err){
        console.log(err.message);
        res.status(409).json({error: `${err.message}`});
    }
    

    
});


userController.post('/login', async(req,res)=>{
    const {email, password} = req.body;

    try{
        const loggedUser = await userService.login(email,password);
        res.status(201).json({loggedUser})
    }catch(err){
        res.status(401).json({error: `${err.message}`})
    }
})



export default userController;