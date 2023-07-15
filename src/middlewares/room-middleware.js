const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-errors');
const { Enums } = require('../utils/common');


const { PERSONAL, GROUP } = Enums.ROOM_TYPE;

function validateCreateRoomRequest(req, res, next) {
    if (req.body.name === undefined) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            'Name is missing in the incoming request',
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (req.body.type === undefined) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            'Type is missing in the incoming request',
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (req.body.type !== PERSONAL && req.body.type !== GROUP) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            `Type can only be ${PERSONAL} or ${GROUP}`,
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }


    next();
}


module.exports = {
    validateCreateRoomRequest
};