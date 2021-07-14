const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'A username is required'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a valid password'],
        minlength: 8
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;