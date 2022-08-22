const {blogModel} = require("../models/index");

//create a new blog
const createBlog = async (req, res) => {
    const {title, content, userId} = req.body;
    const newBlog = new blogModel({
        title,
        content,
        userId
    });
    try {
        const blogSave = await newBlog.save();
        res.status(201).json(blogSave);
    } catch (error) {
        res.status(500).json(error);
    }
}

//get all blogs
const getAllBlogs = async (req, res) => {
    try {
        let option = {
            page: req.query.page || 1,
            limit: req.query.limit || process.env.PAGING_LIMIT,
            sort: { _id: -1 },
          };
        let Blog = await blogModel.paginate({}, option);
        res.status(200).json({ message: "Record found", data: Blog });
    } catch (error) {
        res.status(500).json(error);
    }
}

//get a single blog
const getSingleBlog = async (req, res) => {
    try {
        let Blog = await blogModel.findById(req.params.blogId);
        res.status(200).json({ message: "Record found", data: Blog });
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    createBlog,
    getAllBlogs,
    getSingleBlog
}
