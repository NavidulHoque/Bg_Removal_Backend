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
    
    firstName: {
        type: String,
        required: [true, 'firstName is required']
    },

    lastName: {
        type: String,
        required: [true, 'lastName is required']
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