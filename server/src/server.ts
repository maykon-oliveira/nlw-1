import express from 'express';
import { resolve } from 'path';
import cors from 'cors';
import { errors } from 'celebrate';

// Controllers
import ItemController from './controllers/ItemController';
import PointController from './controllers/PointController';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(resolve(__dirname, '..', 'uploads')));

app.use('/items', ItemController);
app.use('/points', PointController);

app.use(errors());

app.listen(8081);
