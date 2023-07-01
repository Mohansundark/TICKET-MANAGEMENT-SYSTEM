const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,

    },
    lastName: {
        type: String,

    },
    userName: {
        type: String,
        required: true,

    },
    userPwd: {
        type: String,

    },
    email: {
        type: String,


    },
    Phno: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('User', userSchema);