import { getUsers, getUserById, updateUser, deleteUser, createUser } from "../controllers/userController.js";
import express from 'express'
const router = express.Router()


// express router method to create route for getting all users
router.route('/').get(getUsers)

// express router method to create route for getting users by id
router.route('/:id').get(getUserById)
router.route('/update/:id').post(updateUser)
router.route('/delete/:id').get(deleteUser)
router.route('/new').post(createUser)

export default router