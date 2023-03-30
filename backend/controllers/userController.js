const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

async function  register(req, res) {
    try{
        //chack if the user already exists
        const foundUser = await User.findOne({username: req.body.username})

        if(foundUser) {
            return res.status(400).json({error: 'User already exists'})
        }

        //if doesnt exist encrypt their password

        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(req.body.password, salt)

        //Add new user to database with password encrypted

        const newUser = await User.create({...req.body, password: encryptedPassword})

        //generate a JWT token and return it to user

        const payload = {id: newUser._id, user: newUser.username}
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 300})

        res.status(200).json({token})
    }catch(err){
        console.log(err)
        res.status(400).json({error: err.message})
    }
}