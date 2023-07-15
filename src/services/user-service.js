const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../repositories');
const AppError = require('../utils/errors/app-errors');
const { Auth } = require('../utils/common');

const userRepository = new UserRepository();

async function signup(data) {
    try {
        const user = await userRepository.create(data);
        return user;
    } catch (error) {
        console.log(error);

        if (error instanceof AppError) throw error;

        throw new AppError('Cannot create User', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signin(data) {
    try {
        const user = await userRepository.getUserByEmail(data.email);

        if (!user) {
            throw new AppError('No such user exist', StatusCodes.BAD_REQUEST);
        }

        const isPasswordValid = Auth.validatePassword(data.password, user.password);

        if (!isPasswordValid) {
            throw new AppError('Invalid Password', StatusCodes.BAD_REQUEST);
        }

        const token = Auth.createToken({ userId: user.id });

        return token;
    } catch (error) {
        console.log(error);

        if (error instanceof AppError) throw error;

        throw new AppError('Cannot signin the  User', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function authenticateUser(token) {
    try {
        const data = Auth.verifyToken(token);

        const user = await userRepository.get(data.userId);

        if (!user) {
            throw new AppError('No such user Exist', StatusCodes.NOT_FOUND);
        }

        return user.id;
    } catch (error) {
        console.log(error);

        if (error instanceof AppError) throw error;

        throw new AppError('Cannot authenticate the  User', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    signup,
    signin,
    authenticateUser
};