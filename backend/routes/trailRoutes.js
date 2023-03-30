const express = require('express')

const router = express.Router()

const trailControl = require('../controllers/trailController')

const { authorize, confirmUserAccess } = require('../middleware/authMiddleware')

// seed 
router.get('/seed', trailControl.seed)

// index
router.get('/', trailControl.index)


// delete
router.delete('/:id', authorize, confirmUserAccess, trailControl.delete)

// update
router.put('/:id', authorize, confirmUserAccess, trailControl.update)

// create
router.post('/', trailControl.create)

// show
router.get('/:id', trailControl.show)




module.exports = router;