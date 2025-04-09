import jwt from 'jsonwebtoken'
import { JWT_SECRET, REFERSH_SECRET } from '../src/config.js';
import InvalidToken from '../src/models/invalidToken.js';

export const auth = async (req,res,next) =>{
    const token = req.headers['authorization'];
    const refreshToken = req.body.refreshToken;

    if(!token){
        return res.status(401).json({error: 'Authentication required!'});
    };

   

    //check if token is invalidated

    const invalid = await InvalidToken.findOne({token});

    if(invalid){
        return  res.status(401).json({error:`Invalid Token!`})  
    }


    try{
        const decodedToken = jwt.verify(token,JWT_SECRET);

        req.user = decodedToken;
    }catch(err){
        if(!refreshToken){
            return res.status(401).json({error: 'Session expired, please log in again!'});
        };

        try{
            const decodedRefresh = jwt.verify(refreshToken, REFERSH_SECRET);
            const newAccessToken = jwt.sign({id: decodedRefresh.id, username: decodedRefresh.username, email: decodedRefresh.email}, JWT_SECRET, {expiresIn: '2h'});
            res.setHeader('authorization')
        }catch(err){

        }
       
    }

    next()
}


