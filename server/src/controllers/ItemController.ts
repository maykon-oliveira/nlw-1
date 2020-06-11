import { Request, Response } from 'express';
import Knex from 'knex';

export class ItemController {
    db: Knex;

    constructor(db: Knex) {
        this.db = db;
    }
    
    list = async (req: Request, res: Response) => {
        return this.db('items')
            .select('*')
            .then((data) => {
                const items = data.map((i) => ({
                    ...i,
                    image_url: `http://192.168.1.6:8081/uploads/${i.image}`,
                }));
                res.json(items);
            })
            .catch(({ error }) => {
                console.log(error);
                res.status(500).json(error);
            });
    }
}
