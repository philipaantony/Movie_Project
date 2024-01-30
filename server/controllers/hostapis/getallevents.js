// routes/events.js

const express = require('express');
const router = express.Router();
const Event = require('../../model/eventmodel'); // Adjust the path as needed

// Route to get all events
router.get('', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
