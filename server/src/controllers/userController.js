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
    const {email: userEmail, password} = req.body;

    try{
        const loggedUser = await userService.login(userEmail,password);
        const {email,authToken,userId} = loggedUser;
        res.status(201).json({email,authToken,userId})
    }catch(err){
        res.status(401).json({error: `${err.message}`})
    }
});


userController.get('/logout', async (req,res)=>{
    const token = req.headers['x-authorization'];

    await userService.invalidateToken(token);
});

userController.get('/:userId', async (req,res)=>{
    const userId = req.params.userId;

    try{
        const user = await userService.getOneUser(userId);
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
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(404).json('Failed to update user', err.message);
    }
})



export default userController;