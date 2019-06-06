const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const mongoose = require('mongoose');

// routes
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
    } catch (error) {
        res.status(500).json({ message: error });
    }
})
    .get('/:id', (req, res) => {
        res.send('ID!');
    })
    .post('/', async (req, res) => {
        const post = new Post({
            _id: new mongoose.Types.ObjectId,
            title: req.body.title,
            description: req.body.description
        });

        try {
            const savedPost = await post.save();
        } catch (error) {
            res.status(500).json({ message: error });
        }

        res.status(201).json({
            message: "Handling POST request to /posts",
            createdPost: post
        });
    });

module.exports = router;