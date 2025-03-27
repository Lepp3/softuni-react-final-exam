import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../src/config.js';
import InvalidToken from '../src/models/invalidToken.js';

export const auth = async (req,res,next) =>{
    const token = req.headers['x-authorization'];

    if(token){
        return next();
    }

    //check if token is invalidated

    const invalid = await InvalidToken.findOne({token});

    if(invalid){
        return  res.status(401).json({error:`Invalid Token!`})  
    }

    try{
        const decodedToken = jwt.verify(token,JWT_SECRET);

        req.user = decodedToken;
    }catch(err){
       return  res.status(401).json({error:`Invalid Token!`})
    }

    next()
}


export const isAuth = (req,res,next) =>{

    const fakeUserId = '67e550383c99fabcab662784';

    if(!req.user){
        req.user = {id: fakeUserId};
    }

    next()
}