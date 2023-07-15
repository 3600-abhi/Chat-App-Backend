const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-errors');


function validateCreateChatRequest(req, res, next) {
    if (req.body.message === undefined) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            'Message is missing in the incoming request',
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (req.body.message.trim() === '') {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            'Message cannot be Empty',
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (req.body.roomId === undefined) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            'Room Id is missing in the incoming request',
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}


module.exports = {
    validateCreateChatRequest
};