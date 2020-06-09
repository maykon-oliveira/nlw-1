import express from 'express';
import db from '../database/connection';
import knexConfig from '../config/knex.conf';
import { PointController } from '../controllers/PointController';
import multer from 'multer';
import multerConfig from '../config/multer';
import { celebrate, Joi } from 'celebrate';

const uploadMiddware = multer(multerConfig);

const router = express.Router();
const connection = db(knexConfig['development']);
const pointController = new PointController(connection);

router.get('/', pointController.list);
router.get('/:id', pointController.get);
router.post(
    '/',
    uploadMiddware.single('image'),
    celebrate(
        {
            body: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsapp: Joi.string().required(),
                city: Joi.string().required(),
                uf: Joi.string().required().max(2),
                lat: Joi.number().required(),
                lng: Joi.number().required(),
                items: Joi.array().required(),
            }),
        },
        {
            abortEarly: false,
        },
    ),
    pointController.save,
);

export default router;
