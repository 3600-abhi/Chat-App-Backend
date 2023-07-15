const express = require('express');
const userRoutes = require('./user-routes');
const chatRoutes = require('./chat-routes');
const roomRoutes = require('./room-routes');


const router = express.Router();

router.use('/users', userRoutes);

router.use('/chats', chatRoutes);

router.use('/rooms', roomRoutes);

module.exports = router;