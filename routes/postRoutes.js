"use strict";

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const postValidator = require('../middlewares/validators/postValidator');
const multer = require('../middlewares/multerConfigPost');
const auth = require('../middlewares/auth');


// New post
router.post("/",
            auth,
            multer,
            postValidator.schema,
            postValidator.validate,
            postController.newPost
);

// Update post
router.put("/:uuid",
            auth,
            multer,
            postValidator.schema,
            postValidator.validate,
            postController.updateById);

// Get all posts
router.get("/", auth, postController.getAllPosts);

// Get post by id
router.get("/:uuid", auth, postController.getById);


// Delete post
router.delete("/:uuid", auth, postController.deleteById);

// Like a post
router.post("/:uuid/like", auth, postController.likePost);

module.exports = router;