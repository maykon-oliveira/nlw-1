import sinon, { SinonStub } from 'sinon';
import { describe } from 'mocha';
import { ItemController } from '../../../src/controllers/ItemController';
import Knex from 'knex';

describe('ItemController', () => {
    let connection: any = sinon.stub();
    let itemController: ItemController;

    beforeEach(() => {
        itemController = new ItemController(connection as Knex);
    });

    it('GET /items: Should returns a list of items', () => {
        const items = [{ image: 'image1.png' }, { image: 'image2.png' }, { image: 'image3.png' }];
        const res = {
            json: sinon.spy(),
        } as any;

        (connection as SinonStub).withArgs('items').returns({ select: () => Promise.resolve(items) });

        itemController.list({} as any, res).then(() => {
            sinon.assert.calledOnce(res.json);
        });
    });
});
