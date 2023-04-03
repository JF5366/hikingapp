
const express = require('express')
const router = express.Router()

const commentControl = require('../controllers/commentController')
const trailControl = require('../controllers/trailController')
const { authorize, confirmUserAccess } = require('../middleware/authMiddleware')



// EXTRA ROUTES (for comments)

router.post('/:id/comments', commentControl.createComment)

router.delete('/:id/comments/:cid', commentControl.deleteComment)

router.get('/:id/comments', commentControl.indexComment)

router.get('/:id/comments/:cid', commentControl.showComment)

router.put('/:id/comments/:cid', commentControl.updateComment)

module.exports = router