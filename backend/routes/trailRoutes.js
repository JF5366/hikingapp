const express = require('express')

const router = express.Router()

const trailControl = require('../controllers/trailController')



// index
router.get('/', trailControl.index)

// // new
// router.get('/new', trailControl.new)

// router.delete('/clear', trailControl.clear)

// // delete
// router.delete('/:id', trailControl.delete)

// // update
// router.put('/:id', trailControl.update)

// // seed 
// router.post('/seed', trailControl.seed)

// // create
// router.post('/', trailControl.create)

// // edit 
// router.get('/:id/edit', trailControl.edit)

// // show
// router.get('/:id', trailControl.show)

module.exports = router;