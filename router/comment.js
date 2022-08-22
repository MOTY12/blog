const express = require('express');
const router = express();

const commentController = require('../controllers/comment');

router.get('/comment', commentController.getAllComments);
router.get('/comment/:commentId', commentController.getSingleComment);
router.post('comment/:commentId', commentController.replyComment);
router.post('/:blogId', commentController.createComment);

module.exports = router;
