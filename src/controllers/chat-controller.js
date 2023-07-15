const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const { ChatService } = require('../services');
const AppError = require('../utils/errors/app-errors');


async function createChat(req, res) {
    try {
        const chat = await ChatService.createChat({
            senderId: req.userId,
            message: req.body.message,
            roomId: req.body.roomId
        });

        SuccessResponse.message = 'Successfully created the Chat';
        SuccessResponse.data = chat;

        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log(error);

        ErrorResponse.error = error;

        if (error instanceof AppError) {
            return res.status(error.statusCode).json(ErrorResponse);
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}


module.exports = {
    createChat
};