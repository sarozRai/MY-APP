import User from "../models/User.js"
import { uploadFile } from "../utils/cloudinaryUploader.js"


const getUsers = async () => {
    return await User.find()
}

const getUserById = async (userId) => {
    const user = await User.findById(userId).select('-password')
    if (!user) throw {
        status: 404,
        message: "User not found !"
    }

    return user;
}


const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true, runValidators: true })


}


const deleteUser = async (userId) => {
    const user = await User.findByIdAndUpdate(userId, { isActive: false }, { new: true })

    if (!user) throw {
        message: "User not found"
    }
    return { message: "User successfully deactivated!" };
}

const updateRole = async (userId, role) => {
    const updatedUser = await User.findByIdAndUpdate(userId, { $set: { role } }, { new: true, runValidators: true }).select('-password')
    return updatedUser;
}

const updateProfileImage = async (userId, image) => {
    if (!image) throw {
        status: 400,
        message: "Profile image is required"
    }

    const cloudinaryResult = await uploadFile(image.buffer)

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: { profileImage: cloudinaryResult.secure_url } }, { new: true, runValidators: true }).select('-password')

    return updatedUser;

}
export default { getUsers, getUserById, updateUser, deleteUser, updateRole, updateProfileImage }