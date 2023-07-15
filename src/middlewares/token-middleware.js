const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-errors');


function isTokenPresent(req, res, next) {
    if (req.headers['x-access-token'] === undefined) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            'Token is missing in the headers of incoming request',
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}


module.exports = {
    isTokenPresent
}