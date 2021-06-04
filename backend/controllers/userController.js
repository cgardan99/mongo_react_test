import User from '../models/usersModel.js'
import asyncHandler from 'express-async-handler'

//getUsers function to get all users
export const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.json(users)
})

//getUserById function to retrieve user by id
export const getUserById  = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    //if user id match param id send user else throw error
    if(user){
        res.json(user)
    }else{
        res.status(404).json({message: "User not found"})
        res.status(404)
        throw new Error('User not found')
    }
})

export const createUser = asyncHandler(async(req, res) => {
    var data = req.body;
    const created = await User.create({
        firstName: data.firstName,
        secondName: data.secondName,
        userName: data.userName,
        email: data.email,
        password: data.password,
        isAdmin: data.isAdmin,
    })
    const users = await User.find({})
    res.json(users)
})

export const updateUser = asyncHandler(async(req, res) => {
    var data = req.body;
    const updated = await User.findOneAndUpdate({
        _id: req.params.id
    },
    {
        firstName: data.firstName,
        secondName: data.secondName,
        userName: data.userName,
        email: data.email,
        password: data.password,
        isAdmin: data.isAdmin,
    })
    const users = await User.find({})
    res.json(users)
})

export const deleteUser = asyncHandler(async(req, res) => {
    const deleted = await User.findByIdAndRemove(req.params.id)
    const users = await User.find({})
    res.json(users)
})
