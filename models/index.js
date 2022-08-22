const {dbConnection} = require("../utils/db");

// import the comment db
const commentSchema = require("./comment");
const blogSchema = require("./blog");
const userSchema = require("./user");


const commentModel = dbConnection.model("Comments", commentSchema);
const blogModel = dbConnection.model("Blogs", blogSchema);
const userModel = dbConnection.model("Users", userSchema);

module.exports = {commentModel, blogModel, userModel};

