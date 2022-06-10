const express=require("express")
const router = express.Router()
const Post=require("../models/post")
// getting all posts
router.get("/",async (req, res) => {
    const post = await Post.find();
    res.json(post);
})
// creating a post
router.post("/", async (req, res) => {
  

    const post = new Post({
        title: req.body.title,
        description:req.body.description
    })
 try {
     const savedPost = await post.save();
     res.json(savedPost);
 } catch (error) {
     res.json({ message: error });
 }
})
// getting a specific post by id
router.get("/:id",async (req, res) => {
    const post =await Post.findById(req.params.id)
    res.json(post)
    
})
// updating a post
router.put("/:id", async (req, res) => {
    // res.json(post)
    try {
        const updatedPost=await Post.updateOne({_id:req.params.id},{$set:{title:req.body.title},$set:{description:req.body.description}})
        res.json(updatedPost)
    } catch (error) {
        res.json({message:error})
    }

})

// deleting a post
router.delete("/:id", async (req, res) => {
    try {
        const deletedPost = await Post.remove({ _id: req.params.id })
        res.json(deletedPost)
    } catch (error) {
        res.json({message:error})
        
    }
})

module.exports=router;