import { Schema, model, Types} from "mongoose";
import bcrypt from 'bcrypt';


const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
        minlength: [4, "Username should be atleast 2 characters long!"],
        maxlength: [15, "Username should not be more than 15 characters long!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        minlength: [4, "Email should be atleast 2 characters long!"]
    },
    password:{
        type: String,
        required: [true, "Password is required!"],
        minlength: [4, "Password should be atleast 4 characters long!"]
    },
    bio: {
        type: String,
        minlength: [10, "Bio should be atleast 10 characters long!"]
    },
    profileImageUrl: {
        type: String,
    },
    createdPosts: [{
        type: Types.ObjectId,
        ref: 'Camera'
    }],
    likedPosts: [{
        type: Types.ObjectId,
        ref: 'Camera'
    }],
    cart: [{
        types: Types.ObjectId,
        ref: 'Camera',
        price : {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            default: 1
        }
    }

    ]
});

userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        return next()
    }
    
    this.password = await bcrypt.hash(this.password, 10)
})

const User = model('User', userSchema);

export default User;