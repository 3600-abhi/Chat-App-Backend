const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppError = require('../errors/app-errors');
const { ServerConfig } = require('../../config');

function validatePassword(plainPassword, encryptedPassword) {
    try {
        return bcrypt.compareSync(plainPassword, encryptedPassword);
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot validate the Password', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


function createToken(data) {
    try {
        /**
         * when we will verify the generated token using jwt.verify() fn
         * we will get this data object as response
         */
        const token = jwt.sign(data, ServerConfig.JWT_SECRET);
        return token;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot create the Token', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

function verifyToken(token) {
    try {
        /** 
         * jwt.verify() fn return the object with which it was signed if verified
         * {id: 'xxxxx', email: 'xyz@gmail.com', iat: 55654, expire: 45665}
        */
        return jwt.verify(token, ServerConfig.JWT_SECRET);
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot verify the Token', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    validatePassword,
    createToken,
    verifyToken
};