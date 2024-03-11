const express = require('express');
const router = express.Router();
const Comment = require('../../model/commentmodel');

// Define a route to post a comment
router.post('', async (req, res) => {
    try {
        const { userId, filmid, comment } = req.body;

        console.log(req.body)

        // Create a new comment instance
        const newComment = new Comment({
            userId: userId,
            filmid: filmid,
            comment: comment,
        });

        // Save the comment to the database
        const savedComment = await newComment.save();

        return res.status(201).json({ success: true, comment: savedComment });
    } catch (error) {
        console.error('Error posting comment:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const filmid = req.params.id;
        console.log(filmid)
        // Validate the filmid
        if (!filmid) {
            return res.status(400).json({ error: 'Missing filmid parameter.' });
        }

        // Fetch comments based on the provided filmid
        const comments = await Comment.find({ filmid: filmid })
            .populate('userId')
            .sort({ updatedAt: -1 });

        return res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;
