const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const Post = require("./models/Post");

routes.get('/posts', async (req, res)=>{
  const posts = await Post.find({}).sort('-createdAt').exec(function(err,files){
    return res.json(files)
  })
})

routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  console.log(req.file);
  const {
    originalname: name,
    size,
    key,
  } = req.file;

  const post = await Post.create({
    name,
    size,
    key,
    url: `${process.env.APP_URL}/files/${key}`
  });

  return res.json(post);

});

routes.delete('/posts/:id', async (req, res)=>{
  const post = await Post.findById(req.params.id)

  await post.remove()

  return res.send()
})

module.exports = routes;
