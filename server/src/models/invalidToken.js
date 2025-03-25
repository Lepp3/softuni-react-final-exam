import { Schema, model } from "mongoose";


const invalidTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 2 * 60 * 60,
    }
},
    {
        timestamps: true
    }
);


const InvalidToken = model('InvalidToken', invalidTokenSchema);


export default InvalidToken;