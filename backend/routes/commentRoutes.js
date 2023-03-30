
const express = require('express')
const router = express.Router()

const commentControl = require('../controllers/commentController')
const { authorize, confirmUserAccess } = require('../middleware/authMiddleware')



// EXTRA ROUTES (for comments)

router.post('/:id/comments', trailControl.createComment)

router.delete('/:id/comments/:cid', trailControl.deleteComment)

router.get('/:id/comments', trailControl.indexComment)

router.get('/:id/comments/:cid', trailControl.showComment)

router.put('/:id/comments/:cid', trailControl.updateComment)

module.exports = router