const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

async function  register(req, res) {
    try{
        const foundUser = await User.findOne({username: req.body.username})

        if(foundUser) {
            return res.status(400).json({error: 'User already exists'})
        }
        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = await User.create({...req.body, password: encryptedPassword})

        const payload = {id: newUser._id, user: newUser.username}
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 300})

        res.status(200).json({token})
    }catch(err){
        console.log(err)
        res.status(400).json({error: err.message})
    }
}



async function login(req, res) {

    try {
        const foundUser = await User.findOne({ username: req.body.username })

        if (!foundUser) {
            return res.status(404).json({ error: 'No such user exists' })
        }

        const validPass = await bcrypt.compare(req.body.password, foundUser.password)

        if (!validPass) {
            return res.status(400).json({ error: 'Invalid credentials' })
        }

        const payload = { id: foundUser._id, user: foundUser.username }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 300 })

        res.status(200).json({ token }) 

    } catch(err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }
}

module.exports = {
    register,
    login
}