const jwt = require('jsonwebtoken')

const Trail = require('../models/trailModel')
const Comment = require('../models/commentModel')

async function authorize(req, res, next) {
    console.log('auth')
    try{
        let token = req.header('Authorization')
        console.log(token)
        if(!token){
            throw new Error('No token provided')
        }

        token = token.replace('Bearer ', '')

        //check that the token is valid and not expired
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        
        if(payload.error){
            throw new Error(payload.error)
        }

        //attach the payload from the token to the request object
        req.id = payload.id
        req.user = payload.user

        //move on to the next route
        next()
    }catch(err){
        console.log("auth issue")
        console.log(err.message)
        res.status(403).json({error: err.message})
        
    }
}

async function confirmUserAccess(req, res, next) {
    console.log('confirm')
    try {
        // let document;
        // if (req.baseUrl.includes('trail')) { 
        //     document = await Trail.findOne({ _id: req.params.id, user: req.user })
        // } else {
        //     document = await Comment.findOne({ _id: req.params.id, user: req.user })
        // }
        // if (!document) {
        //     throw new Error('User did not create this document')
        // }
        next()
    } catch(err) {
        console.log(err.message)
        res.status(403).json({ error: err.message })
    }
}

module.exports = {
    authorize,
    confirmUserAccess
}