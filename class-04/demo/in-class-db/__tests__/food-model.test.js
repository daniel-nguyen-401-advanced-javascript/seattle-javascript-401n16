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
