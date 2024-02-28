const express = require('express');
const router = express.Router();
const ShortFilm = require('../../model/filmmodel');

router.get('/:userId', async (req, res) => {
    try {

        const userId = req.params.userId;

        // Find all short films by userId
        const shortFilms = await ShortFilm.find({ userId });

        // Send the short films as the response
        res.status(200).json({ shortFilms });
    } catch (error) {
        // Send error response
        console.error('Error fetching short films:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

module.exports = router;
