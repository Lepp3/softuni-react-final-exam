import { Schema, model, Types } from "mongoose";

const refreshTokenSchema = new Schema({
   userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
   },
   token: {
    type: String,
    required: true,
   },
   createdAt: {
    type: Date,
    default: Date.now,
    expires: '7d'
   }
});


const RefreshToken = model('RefreshToken',refreshTokenSchema);


export default RefreshToken;