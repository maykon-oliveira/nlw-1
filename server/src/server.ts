import express from 'express';
import { resolve } from 'path';
import cors from 'cors';

// Controllers
import UserController from './controllers/users';
import ItemController from './controllers/items';
import PointController from './controllers/points';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(resolve(__dirname, '..', 'uploads')));

app.use('/users', UserController);
app.use('/items', ItemController);
app.use('/points', PointController);

app.listen(8081);
