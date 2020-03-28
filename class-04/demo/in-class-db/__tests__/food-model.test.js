const supergoose = require('@code-fellows/supergoose');
const FoodModel = require('../lib/models/food-model.js');

beforeAll(async () => {
    await FoodModel.create({
        name: 'pear',
        calories: 100,
        type: 'FRUIT',
    });

    await FoodModel.create({
        name: 'strawberry',
        calories: 100,
        type: 'FRUIT',
    });
});

describe('Database can create', () => {
    it('for best case', async () => {
        let response = await FoodModel.create({
            name: 'grapes',
            calories: 100,
            type: 'FRUIT',
        });

        console.log(response);

        expect(response).toBeTruthy();
        expect(response.name).toBe('grapes');
    });

    it('except when name is taken', async () => {
        let response = await FoodModel.create({
            name: 'pear',
            calories: 100,
            type: 'FRUIT',
        });

        console.log(response);

        expect(response).toBeFalsy();
    });
});

describe('Database can delete', () => {
    it('after successfully creating record', async () => {
        let newRecord = await FoodModel.create({
            name: 'kiwi',
            calories: 100,
            type: 'FRUIT',
        });

        let delResult = await FoodModel.delete(newRecord._id);
        expect(delResult).toBe(true);
    });

    it('an existing record', async () => {
        let records = await FoodModel.readByField({ name: 'pear' });
        expect(records.length).toBe(1);
        let pearId = records[0]._id;

        let delResult = await FoodModel.delete(pearId);
        expect(delResult).toBe(true);
    });
});
