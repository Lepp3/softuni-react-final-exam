import { JWT_SECRET, REFERSH_SECRET } from "../config.js";
import InvalidToken from "../models/invalidToken.js";
import RefreshToken from "../models/RefreshToken.js";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default {
    async register(userData){
        const user = await User.findOne({ $or: [{email: userData.email}, {username: userData.username}]});

        if(user){
            if(user.email === userData.email){
                throw new Error('Email already in use!');
            };
            if(user.username === userData.username){
                throw new Error('Username already in use!');
            }
            
        };

       
        const createdUser = await User.create(userData);

        const {accessToken, refreshToken} = this.generateToken(createdUser);

        const result = {
            email: createdUser.email,
            username: createdUser.username,
            authToken: accessToken,
            userId: createdUser._id,
            refreshToken,
        }

        return result
    },
     async login(email,password){
        const user = await User.findOne({email});

       

        if(!user){
            throw new Error('Incorrect email or password!');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid){
            throw new Error('Incorrect email or password!');
        }

        const {accessToken, refreshToken} = this.generateToken(createdUser);

        const result = {
            email: createdUser.email,
            username: createdUser.username,
            authToken: accessToken,
            userId: createdUser._id,
            refreshToken,
        }

        return result
     },
     invalidateToken(token){
        return InvalidToken.create({token})
     },
     async refreshToken(refreshToken){
        const validToken = await RefreshToken.findOne({token: refreshToken});
        if(!validToken){
            throw new Error('Invalid token provided');
        }

        const decodedToken = jwt.verify(validToken,REFERSH_SECRET);
        const payload = {
            id: decodedToken.id,
            username: decodedToken.username,
            token: decodedToken.email
            };
        
            const newAccessToken = jwt.sign(payload,JWT_SECRET,{expiresIn: '2h'});

            return newAccessToken;
     },
     async generateToken(user){
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email
        };
    
        const accessToken = jwt.sign(payload,JWT_SECRET,{expiresIn: '2h'});
    
        const refreshToken = jwt.sign(payload,REFERSH_SECRET,{expiresIn: '7d'});
    
        await RefreshToken.create({token: refreshToken, userId: user.id})
    
        return {accessToken, refreshToken};
     },
      getOneUser(userId){
        
        return User.findById(userId).populate('createdPosts').populate('likedPosts')
     },
     async updateUser(userId,userData){
        const allowedUpdates = {
            bio: userData.bio,
            profileImageUrl: userData.profileImageUrl
        }

        return await User.findByIdAndUpdate(
            userId,
            {$set: allowedUpdates},
            {new:true, runValidators: true});
        
     }
}