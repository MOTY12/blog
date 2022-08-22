const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blog');

router.get('/', blogController.getAllBlogs);
router.get('/:blogId', blogController.getSingleBlog);
router.post('/',  blogController.createBlog);


module.exports = router;