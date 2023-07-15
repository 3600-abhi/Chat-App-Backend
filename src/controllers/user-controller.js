const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require('../utils/common');
const { UserService } = require('../services');
const AppError = require('../utils/errors/app-errors');

async function signup(req, res) {
    try {
        const user = await UserService.signup({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            bio: req.body.bio
        });

        SuccessResponse.message = 'Successfully created an Account';
        SuccessResponse.data = user;

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

async function signin(req, res) {
    try {
        const token = await UserService.signin({
            userId: req.userId,
            email: req.body.email,
            password: req.body.password
        });

        SuccessResponse.message = 'Successfully SignedIn the User';
        SuccessResponse.data = { token };

        return res.status(StatusCodes.OK).json(SuccessResponse);
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
    signup,
    signin
};