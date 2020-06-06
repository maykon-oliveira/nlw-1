import ItemController from '../../../src/controllers/ItemController';
import sinon from 'sinon';
import { describe } from 'mocha';

describe('ItemController', () => {
    it('list(req, res)', () => {
        const res = {
            json: sinon.spy()
        } as any;

        ItemController.list({} as any, res).then(() => {
            sinon.assert.calledOnce(res.json);
        });
    });
});
