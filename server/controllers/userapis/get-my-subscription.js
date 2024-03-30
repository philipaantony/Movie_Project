const express = require('express');
const router = express.Router();
const Subscription = require('../../model/subscription');

// GET route to retrieve subscription plan by userId
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const subscription = await Subscription.findOne({ userId });

        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found for the given user ID' });
        }

        res.status(200).json({ subscription_plan: subscription.subscription_plan });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
