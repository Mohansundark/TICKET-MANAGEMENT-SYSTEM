const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const users = require('../models/users');

// Login user
router.get('/login', (req, res) => {
    res.render('users/login');
});

// Register user
router.get('/register', (req, res) => {
    res.render('users/register', {
        user: new users()
    });
});

router.post('/', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            userName,
            userPwd,
            userEmail,
            userPhone
        } = req.body;

        // Check if user already exists
        const existingUser = await users.findOne({
            userName
        });
        if (existingUser) {
            return res.status(400).send('Username already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userPwd, 10);

        // Create a new user
        const newUser = new users({
            firstName,
            lastName,
            userName,
            userPwd: hashedPassword,
            email,
            Phno
        });

        // Save the new user to the database
        await newUser.save();
        res.redirect('/users/login');
    } catch (error) {
        res.status(500).send('Error! Please try again.');
        console.error(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const {
            userName,
            userPwd
        } = req.body;

        // Find the user by username
        const user = await users.findOne({
            userName
        });
        if (!user) {
            return res.status(400).send('Invalid username or password');
        }

        // Compare the passwords
        const isPasswordValid = await bcrypt.compare(userPwd, user.userPwd);
        if (isPasswordValid) {
            // Passwords match, user is authenticated
            res.send('Success');
        } else {
            res.status(400).send('Invalid username or password');
        }
    } catch (error) {
        res.status(500).send('Error occurred');
        console.error(error)
    }
});

module.exports = router;