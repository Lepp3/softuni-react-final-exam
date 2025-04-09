import {Router} from 'express';
import userService from '../services/userService.js';
import { auth } from '../../middlewares/authMiddleware.js';
import RefreshToken from '../models/RefreshToken.js';




const userController = Router();


userController.post('/register', async (req,res,next)=>{

    const userData = req.body;
    

    try{
        const createdUser = await userService.register(userData);
        const {email,username,authToken,userId} = createdUser;
        res.status(201).json({email,username,authToken,userId});
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
        const {email,username,authToken,userId} = loggedUser;
        res.status(201).json({email,username,authToken,userId})
    }catch(err){
        res.status(401);
        next(err);
    }
});


userController.get('/logout', auth, async (req,res)=>{
    const token = req.headers['authorization'];
    const refreshToken = req.body.refreshToken;


    try{
        await userService.invalidateToken(token);

        await RefreshToken.deleteOne({token: refreshToken});

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
        res.json(user)
    }catch(err){
        res.status(404).json('No user found');
    }
    
})

userController.put('/:userId', auth, async (req,res)=>{
    const userId = req.params.userId;
    const userData = req.body;

  

    try{
        const updatedUser = await userService.updateUser(userId,userData);
        if(!updatedUser){
            throw new Error('User not found!');
        }
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(404).json({error: 'Failed to update user',message: err.message});
    }
});

userController.post('/refresh-token', async (req,res)=>{
    const refreshToken = req.body.refreshToken;

    try{
        const newToken = userService.refreshToken(refreshToken);
        if(!newToken){
            throw new Error('Failed to refresh token.')
        }
        res.status(200).json(newToken)
    }catch(err){
        res.status(500).json(err.message);
    }
})



export default userController;