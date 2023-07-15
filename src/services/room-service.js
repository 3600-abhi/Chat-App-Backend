const { StatusCodes } = require('http-status-codes');
const { RoomRepository } = require('../repositories');
const AppError = require('../utils/errors/app-errors');

const roomRepository = new RoomRepository();

async function createRoom(data) {
    try {
        const room = await roomRepository.create(data);
        return room;
    } catch (error) {
        console.log(error);

        if (error instanceof AppError) throw error;

        throw new AppError('Cannot create new Room', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createRoom
};