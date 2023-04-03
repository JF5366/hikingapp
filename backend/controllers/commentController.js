const Trails = require('../models/trailModel')
const Comments = require('../models/commentModel')

module.exports.createComment = async (req, res) => {
    try {
        const comment = await Comments.create(req.body)
        await Trails.findByIdAndUpdate(req.params.cid, {
            $push: {
                comments: comment._id
            }
        })
        res.status(200).json(comment)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.deleteComment = async (req, res) => {
    try {
        await Comments.findByIdAndDelete(req.params.id)
        await Trails.findByIdAndUpdate(req.params.cid, {
            $pull: {

                comments: req.params.id
            }
        })
        res.json({ message: 'deleted successfully' })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.indexComment = async (req, res) => {
    try {
        const order = await Trails.findById(req.params.cid).populate('comments')
        res.json(order.comments)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.showComment = async (req, res) => {
    try {
        const comment = await Comments.findById(req.params.id)
        res.json(comment)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.updateComment = async (req, res) => {
    try {
        await Comments.findByIdAndUpdate(req.params.id, req.body)
        res.json({ message: 'updated successfully' })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}



// //COMMENTS
// module.exports.createComment = async (req, res) => {
//     const comment = await Comments.create(req.body)
//     await Trails.findByIdAndUpdate(req.params.id, {
//         $push: {
//             comments: comment._id
//         }
//     })
//     res.redirect(`/trails/${req.params.id}`)
// }
// module.exports.deleteComment = async (req, res) => {
//     await Comments.findByIdAndDelete(req.params.cid)
//     await Trails.findByIdAndUpdate(req.params.id, {
//         $pull: {
//             comments: req.params.cid
//         }
//     })
//     res.redirect(`/trails/${req.params.id}`)
// }

// module.exports.indexComment = async (req, res) => {
//     const trails = await Trails.findById(req.params.id).populate('comments')
//     res.send(trails.comments)
// }

// module.exports.showComment = async (req, res) => {
//     const comment = await Comments.findById(req.params.cid)
//     res.render('comments/Edit', { postId: req.params.id, comment })
// }

// module.exports.updateComment = async (req, res) => {
//     await Comments.findByIdAndUpdate(req.params.cid, req.body)
//     res.redirect(`/trails/${req.params.id}`)
// }