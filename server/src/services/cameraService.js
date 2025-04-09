import Camera from "../models/Camera.js";
import Review from "../models/Review.js";
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
    async postReview(userId,cameraId,reviewData){
        const camera = await Camera.findById(cameraId);
        const user = await User.findById(userId);
        const review = await Review.create({reviewData,ownerId:user._id,cameraId:camera._id});
        
        camera.reviews.push(review._id);
        await camera.save();
        return review
    },
    async deleteReview(userId,cameraId,reviewId){
        const camera = await Camera.findById(cameraId);
        if(!camera){
            throw new Error('No camera found!');
        };

        const reviewToDelete = await Review.findById(reviewId);
        if(!reviewToDelete){
            throw new Error('No review found!');
        };

        if(camera.ownerId.toString() !== userId && reviewToDelete.ownerId.toString() !== userId){
            throw new Error('Unauthorized! Only post and comment owners can delete comments!');
        };

       
      
        await Review.findByIdAndDelete(reviewId);
        camera.reviews = camera.reviews.filter(review=>review._id.toString() !== reviewId)
        await camera.save()
        return reviewToDelete
    },
    async addCameraToCart(cameraId,userId,quantity){
        const camera = await Camera.findById(cameraId);
        const user = await User.findById(userId);
        if(!user || !camera){
            throw new Error('Operation failed!');
        }
        const price = camera.price * quantity;

        const existingItem = user.cart.find(item=>item._id === camera._id.toString());
        if(!existingItem){
            user.cart.push({cameraId, price,quantity});
        }else{
            existingItem.quantity += quantity;
            existingItem.price += price;
        };

        return user.save();
    },
    async removeCameraFromCart(cameraId,userId,quantity){
        const camera = await Camera.findById(cameraId);
        const user = await User.findById(userId);
        if(!user || !camera){
            throw new Error('Operation failed!');
        };
        const itemInCart = user.cart.find(item=>item._id.toString() === cameraId);
        if(!itemInCart){
            throw new Error('No such item in cart!');
        }

        if(itemInCart.quantity < quantity){
            throw new Error('Remove quantity bigger than available quantity!');
        }
        const priceReduction = itemInCart.price * quantity;
        itemInCart.quantity -= quantity;
        itemInCart.price -= priceReduction;
        return user.save();
    }

}