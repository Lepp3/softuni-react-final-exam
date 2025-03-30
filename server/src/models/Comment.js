import { Schema, model, Types } from "mongoose";

const commentSchema = new Schema({
    ownerId: {
        type: Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 150
    }
},
{timestamps: true});


const Comment = model('Comment',commentSchema);


export default Comment;