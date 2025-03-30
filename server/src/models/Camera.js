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
    likedBy: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    comments: [ { 
        _id: { type: Types.ObjectId, auto: true }, 
        ownerId: { type: Types.ObjectId, ref: "User" }, 
        content: { type: String, minlength: 2, maxlength: 150 }, 
        createdAt: { type: Date, default: Date.now }, 
        updatedAt: { type: Date, default: Date.now }, } ]

},{
    timestamps: true
});

cameraSchema.post('findOneAndDelete', async function(doc,next){
    if(doc){
        console.log('DELETED CAMERA', doc);
        const postId = doc._id;

        await User.updateMany(
            {$or: [{ createdPosts: postId }, { likedPosts: postId }] },
            {$pull: { createdPosts: postId, likedPosts: postId }})
    }

    next()
})


const Camera = model('Camera', cameraSchema);

export default Camera;