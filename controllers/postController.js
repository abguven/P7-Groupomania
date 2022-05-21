"use strict";

const { Post, User, PostLike } = require('../models');
const errHandler = require('./errorHandler');

// New post
exports.newPost = (req, res) => {
    // Get post informations from request body
    const { title, content } = req.body;

    // Prepare url for uploaded image
    let post_image_url = "";
    if (req.file) {
        post_image_url = `${req.protocol}://${req.get('host')}/posts/${req.file.filename}`
    }

    // Retrieve user id
    const userId = req.auth.userId;

    Post.create({
        title,
        content,
        post_image_url,
        user_uuid: userId
    }).then((result) => {
        res.status(201).json(result);

    }).catch((error) => {
        errHandler(error, res, 400);
    });


}


// Get all posts
exports.getAllPosts = (req, res) => {

    // If userId is provided as parameter list only this user's posts
    if (req.query.userId) {
        Post.findAll({ where: { user_uuid: req.query.userId } })
            .then(posts => {
                if (!posts.length) {
                    return res.status(404).json({ error: lang.ERR_NO_POST_FOUND_FOR_USER })
                }
                return res.status(200).json(posts);
            })
            .catch(error => errHandler(error, res));
    } else {
        // otherwise list all posts
        Post.findAll()
            .then(posts => {
                return res.status(200).json(posts);
            })
            .catch(error => errHandler(error, res));
    }

} // exports.getAllPosts = async (req, res)


// Get post by id
exports.getById = (req, res) => {
    const postId = req.params.uuid;
    Post.findByPk(postId, {
        include: [{
            model: User, // Join User model to results
            attributes: { exclude: "password" } // Hide password in results
        }]
    })
        .then(post => {
            if (post === null) {
                return res.status(404).json({ error: lang.ERR_NO_POST_FOUND })
            }
            res.status(200).json(post);
        })
        .catch(error => errHandler(error, res));

}

// Update post
exports.updateById = async (req, res) => {
    try {
        // Find post to update 
        const postId = req.params.uuid;
        const post = await Post.findByPk(postId);

        if (post === null) {
            return res.status(404).json({ error: lang.ERR_NO_POST_FOUND })
        }

        // Authorisation check
        if (req.auth.userId != post.user_uuid) {
            return res.status(403).json({ error: lang.ERR_NOT_AUTHORISED_FOR })
        }

        // Post found, so get data from request body to update the post 
        const { title, content } = req.body;

        if (req.file) {
            post.post_image_url = `${req.protocol}://${req.get('host')}/posts/${req.file.filename}`;
        } else {
            post.post_image_url = "";
        }

        post.title = title;
        post.content = content;

        await post.save();
        return res.status(200).json({ post });
    } catch (error) {
        errHandler(error, res);
    }

} // exports.updateById = async (req, res)


// Delete post
exports.deleteById = (req, res) => {

    // Find post to delete
    Post.findByPk(req.params.uuid)
        .then(post => {
            if (post === null) {
                return res.status(404).json({ error: lang.ERR_NO_POST_FOUND })
            }
            // Authorisation check
            if (req.auth.userId != post.user_uuid && !req.auth.isAdmin) {
                return res.status(403).json({ error: lang.ERR_NOT_AUTHORISED_FOR })
            }
            // Delete the post
            post.destroy();
            res.status(200).json({ message: lang.MSG_POST_DELETED })
        })
        .catch(error => errHandler(error, res))
} // exports.deleteById = (req, res)


// Like or unlike a post
exports.likePost = async (req, res) => {
    const postId = req.params.uuid;
    const userId = req.auth.userId;

    try {
        // Check if the post exists
        const postToLike = await Post.findByPk(postId);
        if (postToLike === null) {
            return res.status(404).json({ error: lang.ERR_NO_POST_FOUND });
        }

        // Check if user already liked this post
        const postLikesOfUser = await PostLike.findAll({
            where: { post_Id: postId, user_id: userId }
        })

        const like = req.params.like;
        if (like == 1) {
            // User wants to like the post
            if (postLikesOfUser.length > 0) { // but he already liked this before, so return an error
                return res.status(400).json({ error: lang.ERR_ALREADY_LIKED_THIS_POST })
            }

            // Create a record of like in "postlikes" table
            const result = await PostLike.create({ post_id: postId, user_id: userId });
            if (result === null) {
                throw new Error(lang.ERR_DB_UPDATE_ERROR);
            }

            postToLike.increment("likes", { by: 1 });
            return res.status(201).json({ message: lang.MSG_LIKE_OK })


        } else if (like == 0) {
            // User wants to unlike the post
            if( postLikesOfUser.length == 0 ){ // but he didn't liked the post before or he already unliked
                return res.status(400).json({ error: lang.ERR_CANT_UNLIKE})
            }

            // Delete his like record from "postlikes" table
            postLikesOfUser[0].destroy();
            
            // Update the number of likes in "posts" table
            postToLike.decrement("likes", { by: 1 });
            return res.status(201).json({ message: lang.MSG_LIKE_OK })
        } else {
            // The request is not valid
            return res.status(400).json({ error: lang.ERR_INVALID_LIKE_ARGUMENT })
        }

    } catch (error) {
        errHandler(error);
    }


} // exports.likePost = (req, res)

