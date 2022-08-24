const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const commentSchema = mongoose.Schema(
  {
    blogId: { 
        type: String, 
        required: true 
    },

    comment: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    upvotes:{
      type: String,
    }

  },
    { timestamps: true }
  );
  
  commentSchema.plugin(mongoosePaginate);
  
  module.exports = commentSchema;
  