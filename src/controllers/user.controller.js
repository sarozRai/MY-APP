import { ROLE_ADMIN, ROLES } from '../constants/roles.js'
import userService from '../services/user.service.js'

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers()
        return res.send(users)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}


const getUserById = async (req, res) => {
    try {
        const targetUserId = req.params.id;
        const loggedInUser = req.user;

        if (!loggedInUser.role.includes(ROLE_ADMIN) && loggedInUser._id.toString() !== targetUserId) {
            return res.status(403).json({ success: false, message: "Access Denied!" })
        }

        const user = await userService.getUserById(targetUserId)
        return res.send(user)
    } catch (error) {
        return res.status(error?.status || 400).send(error.message)
    }
}


const updateUser = async (req, res) => {
    try {
        const targetUserId = req.params.id;
        const loggedInUser = req.user;

        if (!loggedInUser.role.includes(ROLE_ADMIN) && loggedInUser._id.toString() !== targetUserId) {
            return res.status(403).json({ success: false, message: "Access Denied!" })
        }

        const { name, phone } = req.body;

        const updateData = {};

        if (name !== undefined) updateData.name = name;
        if (phone !== undefined) updateData.phone = phone;


        const user = await userService.updateUser(targetUserId, updateData)
        return res.send(user)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}


const deleteUser = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.params.id)
        return res.send(result)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const updateRole = async (req, res) => {
    try {
        const { role } = req.body;
        const targetUserId = req.params.id;

        if (!role) {
            return res.status(400).json({ message: "Role is required" })
        }

        if (!ROLES.includes(role)) {
            return res.status(400).json({ message: "Invalid role provided" })
        }

        const result = await userService.updateRole(targetUserId, role)
        return res.send(result)
    } catch (error) {
        return res.status(error?.status || 400).send(error.message)
    }
}

const updateProfileImage = async (req, res) => {

    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ success: false, message: "Please upload an image!" });
        }
        const targetUserId = req.user._id;
        const result = await userService.updateProfileImage(targetUserId, file);

        return res.send(result)
    } catch (error) {
        return res.status(error?.satus || 400).send(error.message)
    }

}
export default { getUsers, getUserById, updateUser, deleteUser, updateRole, updateProfileImage }