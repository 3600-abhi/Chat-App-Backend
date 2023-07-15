const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const { RoomService } = require('../services');
const AppError = require('../utils/errors/app-errors');


async function createRoom(req, res) {
    try {
        const room = await RoomService.createRoom({
            name: req.body.name,
            type: req.body.type,
            users: [req.userId],
            admins: [req.userId]
        });

        SuccessResponse.message = 'Successfully created a new Room';
        SuccessResponse.data = room;

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
    createRoom
};