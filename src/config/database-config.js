const mongoose = require('mongoose');
const { MONGODB_URI } = require('./server-config');

async function connect() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Successfully connected with MongoDB');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connect
};