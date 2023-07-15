const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    SALT_ROUND: process.env.SALT_ROUND,
    JWT_SECRET: process.env.JWT_SECRET
};