import express from 'express';
import db from '../database/connection';
import { Point } from '../models/point';

const PointController = express.Router();

PointController.post('', async (req, res) => {
    const point = req.body as Point;
    const items: number[] = req.body.items;
    delete point['items'];

    const trx = await db.transaction();

    trx('points')
        .insert({ ...point, image: 'default.svg' })
        .then((points_id) => {
            const point_items = items.map((item_id) => ({ item_id, point_id: points_id[0] }));
            return trx('point_items').insert(point_items);
        })
        .then(() => res.status(201).json(point))
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });

    await trx.commit();
});

PointController.get('/:id', (req, res) => {
    const { id } = req.params;

    db('points')
        .where('id', id)
        .first()
        .then(async (point) => {
            if (!point) {
                return res.status(404).json();
            }
            const items = await db('items')
                .join('point_items', 'items.id', '=', 'point_items.item_id')
                .where('point_items.point_id', point.id)
                .select('title', 'image');

            return res.json({ ...point, items });
        })
        .catch((err) => res.status(500).json(err));
});

PointController.get('', (req, res) => {
    const { city, uf, items } = req.query;

    const sanalizedItems = String(items)
        .split(',')
        .map((s) => Number(s.trim()));        

    db('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', sanalizedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*')
        .then((data) => res.json(data));
});

export default PointController;
