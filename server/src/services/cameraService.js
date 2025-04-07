import Camera from "../models/Camera.js";
import User from "../models/User.js";
import mongoose from "mongoose";


export default {
    async getAll(query={}){
        const cameras = Camera.find(query);

        if(query.name){
            cameras.find({ name: { $regex: query.name, options: 'i' } })
        }
        return cameras
    },
    async getOneCamera(cameraId){
        return Camera.findById(cameraId);
    },
    async createCamera(cameraData,userId){
        const user = await  User.findById(userId);
        const newCamera = await Camera.create({...cameraData,ownerId: userId});
        user.createdPosts.push(newCamera._id);
        user.save();
        return newCamera
    },
    async updateCamera(cameraId,cameraData){
        

        return Camera.findByIdAndUpdate(cameraId,cameraData, {new: true})
    },
    async deleteCamera(cameraId){
        
        return await Camera.findOneAndDelete({_id: cameraId});
    },
    getCreatedCameras(userId){
        return Camera.find({ownerId: userId});
    },
    async likeCamera(cameraId,userId){
        const camera = await Camera.findById(cameraId);
        const user = await User.findById(userId);
        if(camera.ownerId === user._id.toString()){
            throw new Error('Owners cannot like their own content!');
        }
        if(camera.likedBy.includes(user._id.toString())){
            throw new Error('Only one like per user allowed!');
        }
        camera.likedBy.push(userId);
        user.likedPosts.push(camera._id);
        await user.save();
        return camera.save();
    },
    // async getComment(commentId){
    //     const camera = await Camera.findById(cameraId).populate('comments');
    //     return camera.comments;

    // },
    async unlikeCamera(cameraId,userId){
        const camera = await Camera.findById(cameraId);
        const user = await User.findById(userId);
        if(!camera.likedBy.includes(user._id.toString())){
            throw new Error('No like to remove');
        }

       
        camera.likedBy = camera.likedBy.filter(likedUser => likedUser.toString() !== userId.toString());
        user.likedPosts = user.likedPosts.filter(likedCamera => likedCamera.toString() !== cameraId.toString());
        user.save();
        return camera.save()

    },
    async postComment(userId,cameraId,commentData){
        const camera = await Camera.findById(cameraId);
        
        const newComment = {
            _id: new mongoose.Types.ObjectId(), // Generate a unique ID manually
            ownerId: new mongoose.Types.ObjectId(userId),
            content: commentData.content,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        camera.comments.push(newComment);
        await camera.save();
        return newComment
    },
    async deleteComment(userId,cameraId,commentId){
        const camera = await Camera.findById(cameraId);
        if(!camera){
            throw new Error('No camera found!');
        }

        const commentToDelete = camera.comments.find(comment=> comment._id.toString() === commentId);
        if(!commentToDelete){
            throw new Error('No comment found!');
        }

        if(camera.ownerId.toString() !== userId && commentToDelete.ownerId.toString() !== userId){
            throw new Error('Unauthorized! Only post and comment owners can delete comments!');
        }

       
      
        camera.comments = camera.comments.filter(comment=>comment._id !== commentToDelete._id);
        await camera.save()
        return commentToDelete
    },
    async addCameraToCart(cameraId,userId,quantity){
        const camera = await Camera.findById(cameraId);
        const user = await User.findById(userId);
        if(!user){
            throw new Error('No user!');
        };
        if(!camera){
            throw new Error('No camera found!');
        };
        const price = camera.price * quantity;

        const existingItem = user.cart.find(item=>item._id === camera._id.toString());
        if(!existingItem){
            user.cart.push({cameraId, price,quantity});
        }else{
            existingItem.quantity += quantity;
            existingItem.price += price;
        };

        return user.save();
    }

}