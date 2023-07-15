const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ServerConfig } = require('../config');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    }
});


UserSchema.pre('save', function (next) {
    const saltRound = parseInt(ServerConfig.SALT_ROUND);

    const encryptedPassword = bcrypt.hashSync(this.password, saltRound);

    this.password = encryptedPassword;

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;