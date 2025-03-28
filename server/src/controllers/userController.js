import {Router} from 'express';
import userService from '../services/userService.js';
import { auth } from '../../middlewares/authMiddleware.js';




const userController = Router();


userController.post('/register', async (req,res,next)=>{

    const userData = req.body;
    

    try{
        const createdUser = await userService.register(userData);
        const {email,authToken,userId} = createdUser;
        res.status(201).json({email,authToken,userId});
    }catch(err){
        console.error(err.message);
        res.status(409);
        next(err); // Pass error to the error-handling middleware
    }
    

    
});


userController.post('/login', async(req,res,next)=>{
    const {email: userEmail, password} = req.body;

    try{
        const loggedUser = await userService.login(userEmail,password);
        const {email,authToken,userId} = loggedUser;
        res.status(201).json({email,authToken,userId})
    }catch(err){
        res.status(401);
        next(err);
    }
});


userController.get('/logout', auth, async (req,res)=>{
    const token = req.headers['authorization'];
    

    try{
        await userService.invalidateToken(token);

        res.status(200).json('Logout successful!');
    }catch(err){
        res.status(500).json("Logout failed!");
    }
    
});

userController.get('/:userId', async (req,res)=>{
    const userId = req.params.userId;

    try{
        const user = await userService.getOneUser(userId);
        if(!user){
            throw new Error('User not found');
        }
        res.status(200).json(user)
    }catch(err){
        res.status(404).json('No user found');
    }
    
})

userController.put('/:userId', async (req,res)=>{
    const userId = req.params.userId;
    const userData = req.body;

    try{
        const updatedUser = await userService.updateUser(userId,userData);
        if(!updatedUser){
            throw new Error('User not found!');
        }
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(404).json('Failed to update user', err.message);
    }
})



export default userController;