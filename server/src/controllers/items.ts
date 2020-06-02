import express from 'express';
import db from '../database/connection';

const ItemController = express.Router();

ItemController.get('', (req, res) => {
    db('items')
        .select('*')
        .then((data) => {
            const items = data.map(i => ({...i, image_url: `http://localhost:8081/uploads/${i.image}`}))
            res.json(items);
        })
        .catch(({ error }) => {
            console.log(error);
            res.status(500).json(error);
        });
});

export default ItemController;
