import { Schema, model, Types } from "mongoose";
import User from "./User.js";


const cameraSchema = new Schema({
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    resolution: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ownerId: {
        type: Types.ObjectId,
        ref: 'User'
    },
    recommendedBy: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    reviews: [ { 
        type: Types.ObjectId,
        ref: 'Review'
         } ]

},{
    timestamps: true
});

cameraSchema.post('findOneAndDelete', async function(doc,next){
    if(doc){
        
        const postId = doc._id;

        await User.updateMany(
            {$or: [{ createdPosts: postId }, { likedPosts: postId }] },
            {$pull: { createdPosts: postId, likedPosts: postId }})
    }

    next()
})


const Camera = model('Camera', cameraSchema);

export default Camera;