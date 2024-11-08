import mongoose from "mongoose";

const {Schema} = mongoose

const UserSchema = new Schema({

    clerkID: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, "Email already exists"]
    },
    
    username: {
        type: String,
        required: [true, 'Username is required']
    },

    photo: {
        type: String,
        required: true
    },

    balance: {
        type: Number,
        default: 5
    }

})

export const User = mongoose.model('User', UserSchema)