import express from 'express';
import db from '../database/connection';
import knexConfig from '../config/knex.conf';
import { ItemController } from '../controllers/ItemController';

const router = express.Router();
const connection = db(knexConfig['development']);
const itemController = new ItemController(connection);

router.get('/', itemController.list);

export default router;
