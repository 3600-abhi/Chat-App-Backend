const express = require('express');
const { RoomMiddleware, TokenMiddleware, UserMiddleware } = require('../../middlewares');
const { RoomController } = require('../../controllers');

const router = express.Router();

router.use([
    TokenMiddleware.isTokenPresent,
    UserMiddleware.authenticateUser
]);

router.post(
    '/',
    RoomMiddleware.validateCreateRoomRequest,
    RoomController.createRoom
);


module.exports = router;