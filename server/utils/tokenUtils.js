import jwt from 'jsonwebtoken';
import { JWT_SECRET,REFERSH_SECRET } from '../src/config.js';
import RefreshToken from '../src/models/RefreshToken.js';


export const generateToken = async (user) =>{
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    };

    const accessToken = jwt.sign(payload,JWT_SECRET,{expiresIn: '2h'});

    const refreshToken = jwt.sign(payload,REFERSH_SECRET,{expiresIn: '7d'});

    await RefreshToken.create({token: refreshToken, userId: user.id})

    return {accessToken, refreshToken};
}


export const refreshToken = async(req,res)=>{
    const {refreshToken} = req.body;

    if(!refreshToken){
        return res.status(401).json({message: 'No refresh token provided!'});
    }

    
}
