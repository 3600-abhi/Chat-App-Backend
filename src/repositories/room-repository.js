const CrudRepository = require('./crud-repository');
const { Room } = require('../models');

class RoomRepository extends CrudRepository {
    constructor() {
        super(Room);
    }
}

module.exports = RoomRepository;