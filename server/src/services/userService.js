import { generateToken } from "../../utils/tokenUtils.js";
import InvalidToken from "../models/invalidToken.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt';

export default {
    async register(userData){
        const user = await User.findOne({email: userData.email});

        if(user){
            throw new Error('User already exists!');
        };

        if(userData.password !== userData.rePassword){
            throw new Error('Password mismatch!');
         }

        const createdUser = await User.create(userData);

        const token = generateToken(createdUser);

        const result = {
            email: userData.email,
            authToken: token,
            userId: user._id
        }

        return result
    },

     async login(email,password){
        const user = await User.findOne({email});

       

        if(!user){
            throw new Error('Email or password are incorrect!');
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid){
            throw new Error('Email or password are incorrect!');
        }

        const token = generateToken(user);

        const result = {
            email,
            authToken: token,
            userId: user._id
        }

        return result;
     },

     invalidateToken(token){
        return InvalidToken.create({token})
     }
}