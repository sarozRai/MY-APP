import express, { Router } from 'express';
import userController from '../controllers/user.controller.js';
import auth from '../middlewares/auth.js';
import roleBasedAuth from '../middlewares/roleBasedAuth.js';
import { ROLE_ADMIN, ROLE_USER } from '../constants/roles.js';
import { userUpdateSchema } from '../validations/userValidation.js';
import validate from '../middlewares/validate.js'
import { upload } from '../config/cloudinary.js';
const router = express.Router()
router.get('/all', auth, roleBasedAuth(ROLE_ADMIN), userController.getUsers)

router.get('/:id', auth, userController.getUserById)

router.put('/profile/:id', auth, validate(userUpdateSchema), userController.updateUser)


router.delete('/profile/:id', auth, roleBasedAuth(ROLE_ADMIN), userController.deleteUser)

router.put("/:id/role", auth, roleBasedAuth(ROLE_ADMIN), userController.updateRole)


router.put("/:id/profile-image", auth, roleBasedAuth(ROLE_USER), upload.single('profileImage'), userController.updateProfileImage)

export default router; 