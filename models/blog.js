const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

blogSchema.plugin(mongoosePaginate); 

module.exports = blogSchema;
