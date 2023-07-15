const express = require('express');
const { ChatMiddleware, TokenMiddleware, UserMiddleware } = require('../../middlewares');
const { ChatController } = require('../../controllers');

const router = express.Router();

router.use([
    TokenMiddleware.isTokenPresent,
    UserMiddleware.authenticateUser
]);

router.post(
    '/',
    ChatMiddleware.validateCreateChatRequest,
    ChatController.createChat
);



module.exports = router;