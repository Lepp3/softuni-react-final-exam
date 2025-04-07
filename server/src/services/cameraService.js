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
    async recommendCamera(cameraId,userId){
        const camera = await Camera.findById(cameraId);
        const user = await User.findById(userId);
        if(camera.ownerId === user._id.toString()){
            throw new Error('Owners cannot recommend their own content!');
        }
        if(camera.recommendedBy.includes(user._id.toString())){
            throw new Error('Only one recommendation per user allowed!');
        }
        camera.recommendedBy.push(userId);
        user.recommendedPosts.push(camera._id);
        await user.save();
        return camera.save();
    },
    async removeRecommendationOnCamera(cameraId,userId){
        const camera = await Camera.findById(cameraId);
        const user = await User.findById(userId);
        if(!camera.recommendedBy.includes(user._id.toString())){
            throw new Error('No recommendation to remove');
        }

       
        camera.recommendedBy = camera.recommendedBy.filter(recommendedUser => recommendedUser.toString() !== userId.toString());
        user.recommendedPosts = user.recommendedPosts.filter(recommendedCamera => recommendedCamera.toString() !== cameraId.toString());
        user.save();
        return camera.save()

    },
    // TODO: FIX WORDING AND IMPLEMENT REVIEW MODEL HERE
    async postReview(userId,cameraId,reviewData){
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
    // AND HERE
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