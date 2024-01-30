const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Login = require('../model/loginmodel');
const HostRegistration = require('../model/hostmodel');

router.post('', async (req, res) => {
    try {
        // Destructure relevant data from the request body
        const { name, email, phone, password, confirmPassword } = req.body;
        const newHost = new HostRegistration({
            hostname: name,
            email: email,
            contactNumber: phone,
        });

        // Save the host registration
        const savedHost = await newHost.save();

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new login entry with the host's _id as the unique identifier
        const newLogin = new Login({
            _id: savedHost._id,
            email,
            password: hashedPassword,
            usertype: "host",
            status: "blocked",
        });

        // Save the login information
        const savedLogin = await newLogin.save();

        // Check if both host registration and login information are saved successfully
        if (savedHost && savedLogin) {
            return res.status(201).json({ message: 'Registration Successful', savedHost, navigation: true });
        }
    } catch (error) {
        if (error.code === 11000) {
            console.log("Email Duplication");
            return res.status(201).json({ message: 'mail-Duplication', navigation: false });
        } else {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
});

module.exports = router;
