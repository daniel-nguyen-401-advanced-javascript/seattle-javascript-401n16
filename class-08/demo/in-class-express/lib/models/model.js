'use strict';

// in between our JS code and our Mongoose generated model
// simplifies our CRUD operations so that devs don't
// have to know about MongoDB specifics (.save, .find)

// connecting model to fruits and vegetables (prod, cat)

class Model {
    constructor(schema) {
        this.schema = schema;
    }

    async create() {}

    async read(_id) {
        // verify that id is a valid id
        // findOne with that id

        let record = await this.schema.findOne({ _id });
        return record;
    }

    async readByQuery(query) {
        let results = await this.schema.find(query);
        return results;
    }

    async update() {}

    async delete() {}
}

module.exports = Model;
