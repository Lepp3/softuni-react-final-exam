import { Schema, model, Types } from "mongoose";


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


const Camera = model('Camera', cameraSchema);

export default Camera;