const Trails = require('../models/trailModel')

module.exports.index = async(req, res) => {
    try {
    const trails = await Trails.find()

    res.render('trails/Index', { trails }) 
    } catch(err) {
     console.log(err)
     res.send(err.message)
}
}

module.exports.show = async (req, res) => {
    try {
        const trails = await Trails.findById(req.params.id)
        res.render('fruits/Show', { fruit })
    } catch(err) {
        console.log(err)
        res.send(err.message)
    }
}

module.exports.new = (req, res) => {
    res.render('trails/New')
}

module.exports.create = async(req, res) => {

    if (req.body.readyToEat) {
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    try {
        // use the model to interact with db and create a new document in the fruit collection
        const result = await Fruit.create(req.body)
        console.log(result)
    } catch(err) {
        console.log('error')
    }
    
//    fruits.push(req.body)
    res.redirect('/fruits')
}
