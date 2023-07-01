const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const admin = require('../models/admin.js');

// Login admin
router.get('/login', (req, res) => {
    res.render('admins/login');
});

// Register admin
router.get('/register', (req, res) => {
    res.render('admins/register', {
        admin: new admin()
    });
});

router.post('/', async (req, res) => {
    try {
        const {
            admin_ID,
            firstName,
            lastName,
            password,
            email,
            phone
        } = req.body;

        // Check if admin already exists
        const existingAdmin = await admin.findOne({
            admin_ID
        });
        if (existingAdmin) {
            return res.status(400).send('Username already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const newAdmin = new admin({
            admin_ID,
            firstName,
            lastName,
            password: hashedPassword,
            email,
            phone
        });

        // Save the new admin to the database
        await newAdmin.save();
        res.redirect('/admin/login');
    } catch (error) {
        res.status(500).send('Error! Please try again.');
        console.error(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const {
            admin_ID,
            password
        } = req.body;

        // Find the admin by username
        const adminUser = await admin.findOne({
            admin_ID
        });
        if (!adminUser) {
            return res.status(400).send('User Not found');
        }

        // Compare the passwords
        const isPasswordValid = await bcrypt.compare(password, adminUser.password);
        if (isPasswordValid) {
            // Passwords match, admin is authenticated
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