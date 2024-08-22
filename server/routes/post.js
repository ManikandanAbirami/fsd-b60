const express = require("express");
const multer = require("multer");
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const router = express.Router();
const path = require("path");

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../client/public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Create a new post
router.post("/create", auth, upload.single("image"), async (req, res) => {
  const { content } = req.body;

  try {
    const newPost = new Post({
      user: req.user._id,
      content,
      image: req.file ? `public/images/${req.file.filename}` : "",
      date: new Date().toLocaleDateString(),
    });

    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get all posts
router.get("/all", auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", ["username", "profilePicture"])
      .populate("comments.user", ["username"])
      .sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// like a post
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userIndex = post.likes.indexOf(req.user._id);

    if (userIndex >= 0) {
      post.likes.splice(userIndex, 1); // unlike the post
    } else {
      post.likes.push(req.user._id); // like the post
    }

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// commment on a post
router.put("/comment/:id", auth, async (req, res) => {
  const { text } = req.body;
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      user: req.user._id,
      text,
      date: new Date().toLocaleDateString(),
    };

    post.comments.push(newComment);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete a comment
router.delete("/comment/:postId/:commentId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Find the comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.commentId
    );

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.id)
      .indexOf(req.params.commentId);

    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
