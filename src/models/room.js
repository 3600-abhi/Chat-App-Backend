const mongoose = require('mongoose');
const { Enums } = require('../utils/common');

const { PERSONAL, GROUP } = Enums.ROOM_TYPE;

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: [PERSONAL, GROUP],
        required: true
    },
    users: {
        type: [{ type: mongoose.Schema.Types.ObjectId, required: true }]
    },
    admins: {
        type: [{ type: mongoose.Schema.Types.ObjectId, required: true }]
    }
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;