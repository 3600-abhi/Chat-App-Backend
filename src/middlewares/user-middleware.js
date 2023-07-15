const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-errors');
const { UserService } = require('../services');


function validateSignupRequest(req, res, next) {
    if (req.body.name === undefined) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            'Name is missing in the incoming request',
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (req.body.email === undefined) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            'Email is missing in the incoming request',
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (req.body.password === undefined) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            'Password is missing in the incoming request',
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}

function validateSigninRequest(req, res, next) {
    if (req.body.email === undefined) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            'Email is missing in the incoming request',
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (req.body.password === undefined) {
        ErrorResponse.message = 'Something went wrong';
        ErrorResponse.error = new AppError(
            'Password is missing in the incoming request',
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}

async function authenticateUser(req, res, next) {
    try {
        const token = req.headers['x-access-token'];

        const userId = await UserService.authenticateUser(token);

        req.userId = userId;

        next();
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
    validateSignupRequest,
    validateSigninRequest,
    authenticateUser
};