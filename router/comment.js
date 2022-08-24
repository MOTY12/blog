const express = require('express');
const router = express();

const userauth = require("../middleware/auth")

const commentController = require('../controllers/comment');

router.get('/comment', commentController.getAllComments);
router.get('/comment/:commentId', commentController.getSingleComment);
router.post('comment/:commentId', userauth,commentController.replyComment);
router.post('/:blogId', userauth,commentController.createComment);
router.post('upvote/:commentId', commentController.upvoteComment)


module.exports = router;
