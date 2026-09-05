import mongoose from "mongoose";

const userShcema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: [true, "User with this email already exists!"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required!"],
        unique: [true, "User with this  number already exists!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minLength: [8, "Password must be at least 8 character"]
    },
    role: {
        type: [String],
        required: true,
        enum: ['USER', 'MERCHANT', 'ADMIN'],
        default: ["USER"]
    },
    address: {
        city: {
            type: String,
            required: true,
        },
        street: {
            type: String
        },
        province: {
            type: String,
            required: true
        }
    },
    profileImage: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
})

const User = mongoose.model("User", userShcema);

export default User; 