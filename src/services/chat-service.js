const { StatusCodes } = require('http-status-codes');
const { ChatRepository } = require('../repositories');
const AppError = require('../utils/errors/app-errors');

const chatRepository = new ChatRepository();

async function createChat(data) {
    try {
        const chat = await chatRepository.create(data);
        return chat;
    } catch (error) {
        console.log(error);

        if (error instanceof AppError) throw error;

        throw new AppError('Cannot create the Chat', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createChat
};