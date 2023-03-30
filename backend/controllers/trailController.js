const Trails = require('../models/trailModel')
const Comments = require('../models/commentModel')

const trails = require('../models/trails')

module.exports.seed = async (req, res) => {
    await Trails.create(trails)
    res.redirect('/trails')
}

module.exports.index = async(req, res) => {
    try {
    const trails = await Trails.find()
    res.status(200).json(trails)
   // res.render('trails/Index', { trails }) 
    } catch(err) {
     console.log(err)
     res.send(err.message)
}
}

module.exports.delete = async (req, res) => {
    const trails = await Trails.findByIdAndDelete(req.params.id)

    await Comments.deleteMany({ _id: { 

        $in: trails.comments 
    }})
    res.redirect('/trails')
}


module.exports.show = async (req, res) => {
    try {
        const trails = await Trails.findById(req.params.id).populate('comments')
        res.render('trails/Show', { trails })
    } catch(err) {
        console.log(err)
        res.send(err.message)
    }
}

module.exports.new = (req, res) => {
    res.render('trails/New')
}


module.exports.update = async (req, res) => {
    try {
       const update = await Trails.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(update)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.create = async(req, res) => {

    try {
       const result = await Trails.create(req.body)
        console.log(result)
        res.redirect('/trails')
    } catch(err) {
        console.log('error')
    }
}

module.exports.show = async (req, res) => {
    try {
        const trails = await Trails.findById(req.params.id).populate('comments')
        res.status(200).json(trails)
    } catch(err) {
        res.status(404).json({ error: err.message })
    }
}



// module.exports.edit = async (req, res) => {
//     const trails = await Trails.findById(req.params.id)
//     console.log(t)
//     res.render('trails/Edit', { trails })
// }


