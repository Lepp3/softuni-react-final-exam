import { generateToken } from "../../utils/tokenUtils.js";
import InvalidToken from "../models/invalidToken.js";
import User from "../models/User.js";
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

        const token = generateToken(createdUser);

        const result = {
            email: createdUser.email,
            username: createdUser.username,
            authToken: token,
            userId: createdUser._id
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

        const token = generateToken(user);

        const result = {
            email: user.email,
            username: user.username,
            authToken: token,
            userId: user._id
        }

        return result;
     },

     invalidateToken(token){
        return InvalidToken.create({token})
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