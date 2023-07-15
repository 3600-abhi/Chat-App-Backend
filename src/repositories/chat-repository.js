const CrudRepository = require('./crud-repository');
const { Chat } = require('../models');

class ChatRepository extends CrudRepository {
    constructor() {
        super(Chat);
    }
}

module.exports = ChatRepository;