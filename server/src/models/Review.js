import { Schema, model, Types } from "mongoose";

const reviewSchema = new Schema({
    ownerId: {
        type: Types.ObjectId,
        ref: 'User'
    },
    cameraId: {
        type: Types.ObjectId,
        ref: 'Camera'
    },
    content: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 500,
    },
    likes: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: Types.ObjectId,
        ref: 'User'
    }]
},
{timestamps: true});


const Review = model('Review',reviewSchema);


export default Review;