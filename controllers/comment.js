const {commentModel, blogModel} = require("../models/index");

//create a new comment
const createComment = async (req, res) => {
    const {comment,userId} = req.body;
    const { blogId} = req.params;
    //check if blog post exists
    const blog = await blogModel.find({_id: blogId});
    if (!blog) {
        return res.status(404).json({ message: "Blog post not found" });
    }


    const newComment = new commentModel({
        comment,
        userId,
        blogId
    });
    try {
        const commentSave = await newComment.save();
        res.status(201).json(commentSave);
    } catch (error) {
        res.status(500).json(error);
    }
}

//reply to a comment
const replyComment = async (req, res) => {
    const {comment} = req.body;
    const {userId, blogId} = req.params;
    const newComment = new commentModel({
        comment,
        userId,
        blogId,
    });
    try {
        const commentSave = await newComment.save();
        res.status(201).json(commentSave);
    } catch (error) {
        res.status(500).json(error);
    }
}



//get all comments
const getAllComments = async (req, res) => {
    try {
        let Comment = await commentModel.find({
            blogId: req.params.blogId,
          });
          res.status(200).json({ message: "Record found", data: Comment });
    } catch (error) {
        res.status(500).json(error);
    }
}

//get a single comment
const getSingleComment = async (req, res) => {
    try {
        let Comment = await commentModel.findById(req.params.commentId);
        res.status(200).json({ message: "Record found", data: Comment });
    } catch (error) {
        res.status(500).json(error);
    }
}

//upvote a comment
const upvoteComment = async (req, res) => {
    try {
        let Comment = await commentModel.findById(req.params.commentId);
        Comment.upvotes += 1;
        const commentSave = await Comment.save();
        res.status(201).json(commentSave);
    } catch (error) {
        res.status(500).json(error);
    }
}



module.exports = {
    createComment,
    replyComment,
    getAllComments,
    getSingleComment,
    upvoteComment
}

