const mongoose = require("mongoose");
const fs = require('fs')
const path = require('path')
const {promisify} = require('util')

const PostSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.pre('remove',function(){
  return promisify(fs.unlink)(path.resolve(__dirname,'..','..','pdfs',this.key))
})

module.exports = mongoose.model("Post", PostSchema);
