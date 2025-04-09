import jwt from 'jsonwebtoken'
import { JWT_SECRET} from '../src/config.js';
import InvalidToken from '../src/models/invalidToken.js';

export const auth = async (req,res,next) =>{
    const token = req.headers['authorization'];
    

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
        throw new Error('Failed to validate token!');
    }

    next()
}


