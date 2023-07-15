const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-errors');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async get(id) {
        const response = await this.model.findOne({ _id: id });

        if (!response) {
            throw new AppError('No such record found', StatusCodes.NOT_FOUND);
        }

        return response;
    }

    async getAll() {
        const response = await this.model.find({});
        return response;
    }

    async update(id, data) {
        const response = await this.model.updateOne({ _id: id }, { $set: data });
        return response;
    }

    async destroy(id) {
        const response = await this.model.deleteOne({_id: id});
        return response;
    }
}

module.exports = CrudRepository;