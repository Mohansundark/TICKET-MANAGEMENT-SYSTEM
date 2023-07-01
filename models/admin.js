const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    admin_ID: {
        type: String,
        unique: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('Admin', adminSchema);