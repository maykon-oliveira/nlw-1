import express from 'express';
import ItemController from '../controllers/ItemController';

const router = express.Router();

router.get('/', ItemController.list);

export default router;
